from __future__ import annotations

from typing import Any

import pandas as pd


def build_histograms(df: pd.DataFrame, max_columns: int = 4, bins: int = 10) -> list[dict[str, Any]]:
    numeric_df = df.select_dtypes(include=["number"])
    charts: list[dict[str, Any]] = []

    for column in numeric_df.columns[:max_columns]:
        series = numeric_df[column].dropna()
        if series.empty:
            continue

        counts, _ = pd.cut(series, bins=bins, include_lowest=True, retbins=True)
        grouped = counts.value_counts(sort=False)

        data = []
        for interval, count in grouped.items():
            data.append(
                {
                    "label": f"{interval.left:.2f} to {interval.right:.2f}",
                    "count": int(count),
                }
            )

        charts.append({"column": column, "data": data})

    return charts


def build_categorical_bars(df: pd.DataFrame, max_columns: int = 3, top_n: int = 8) -> list[dict[str, Any]]:
    categorical_df = df.select_dtypes(exclude=["number"])
    charts: list[dict[str, Any]] = []

    for column in categorical_df.columns[:max_columns]:
        counts = (
            categorical_df[column]
            .fillna("Missing")
            .astype(str)
            .value_counts()
            .head(top_n)
        )
        charts.append(
            {
                "column": column,
                "data": [{"label": label, "count": int(count)} for label, count in counts.items()],
            }
        )

    return charts


def build_scatter_relationship(df: pd.DataFrame) -> dict[str, Any] | None:
    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.shape[1] < 2:
        return None

    corr = numeric_df.corr(numeric_only=True).abs()
    best_pair: tuple[str, str] | None = None
    best_value = -1.0

    columns = list(numeric_df.columns)
    for i, first in enumerate(columns):
        for second in columns[i + 1 :]:
            value = corr.loc[first, second]
            if pd.notna(value) and value > best_value:
                best_value = float(value)
                best_pair = (first, second)

    if not best_pair:
        return None

    first, second = best_pair
    points = (
        numeric_df[[first, second]]
        .dropna()
        .head(300)
        .rename(columns={first: "x", second: "y"})
        .to_dict(orient="records")
    )

    return {
        "x_axis": first,
        "y_axis": second,
        "data": points,
    }


def build_correlation_heatmap(df: pd.DataFrame) -> list[dict[str, Any]]:
    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.shape[1] < 2:
        return []

    corr = numeric_df.corr(numeric_only=True).round(3)
    points: list[dict[str, Any]] = []
    for y_axis in corr.index:
        for x_axis in corr.columns:
            points.append(
                {
                    "x": x_axis,
                    "y": y_axis,
                    "value": float(corr.loc[y_axis, x_axis]),
                }
            )
    return points


def generate_visualizations(df: pd.DataFrame) -> dict[str, Any]:
    return {
        "correlation_heatmap": build_correlation_heatmap(df),
        "histograms": build_histograms(df),
        "categorical_bars": build_categorical_bars(df),
        "scatter_relationship": build_scatter_relationship(df),
    }
