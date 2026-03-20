from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd


def sanitize_value(value: Any) -> Any:
    """Convert pandas and numpy values into JSON-safe primitives."""
    if pd.isna(value):
        return None
    if isinstance(value, (np.integer,)):
        return int(value)
    if isinstance(value, (np.floating, float)):
        return round(float(value), 4)
    if isinstance(value, (pd.Timestamp,)):
        return value.isoformat()
    return value


def preview_dataset(df: pd.DataFrame, limit: int = 10) -> dict[str, Any]:
    preview = (
        df.head(limit)
        .replace({np.nan: None})
        .apply(lambda col: col.map(sanitize_value))
    )
    return {
        "columns": df.columns.tolist(),
        "rows": preview.to_dict(orient="records"),
        "shape": {"rows": int(df.shape[0]), "columns": int(df.shape[1])},
    }


def get_column_types(df: pd.DataFrame) -> dict[str, str]:
    return {column: str(dtype) for column, dtype in df.dtypes.items()}


def get_summary_statistics(df: pd.DataFrame) -> list[dict[str, Any]]:
    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.empty:
        return []

    summary = numeric_df.describe().transpose().reset_index().rename(columns={"index": "column"})
    records = summary.to_dict(orient="records")
    return [
        {key: sanitize_value(value) for key, value in record.items()}
        for record in records
    ]


def get_missing_values(df: pd.DataFrame) -> list[dict[str, Any]]:
    missing = df.isna().sum()
    return [
        {
            "column": column,
            "missing": int(count),
            "missing_percentage": round((count / len(df)) * 100, 2) if len(df) else 0.0,
        }
        for column, count in missing.items()
    ]


def get_correlation_matrix(df: pd.DataFrame) -> list[dict[str, Any]]:
    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.shape[1] < 2:
        return []

    correlation = numeric_df.corr(numeric_only=True).round(3)
    heatmap_points: list[dict[str, Any]] = []

    for row_name, row in correlation.iterrows():
        for column_name, value in row.items():
            heatmap_points.append(
                {
                    "x": column_name,
                    "y": row_name,
                    "value": sanitize_value(value),
                }
            )

    return heatmap_points


def generate_basic_insights(df: pd.DataFrame) -> list[str]:
    insights: list[str] = []

    rows, columns = df.shape
    insights.append(f"The dataset contains {rows} rows and {columns} columns.")

    missing = df.isna().sum()
    missing_columns = missing[missing > 0].sort_values(ascending=False)
    if not missing_columns.empty:
        top_missing_column = missing_columns.index[0]
        top_missing_count = int(missing_columns.iloc[0])
        insights.append(
            f"Missing values are highest in '{top_missing_column}' with {top_missing_count} empty records."
        )
    else:
        insights.append("No missing values were detected across the dataset.")

    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.shape[1] >= 2:
        corr = numeric_df.corr(numeric_only=True)
        upper_triangle = corr.where(np.triu(np.ones(corr.shape), k=1).astype(bool))
        strongest_pair = upper_triangle.abs().stack().sort_values(ascending=False)

        if not strongest_pair.empty:
            col_a, col_b = strongest_pair.index[0]
            corr_value = corr.loc[col_a, col_b]
            relationship = "positive" if corr_value >= 0 else "negative"
            insights.append(
                f"The strongest numeric relationship is a {relationship} correlation between '{col_a}' and '{col_b}' ({corr_value:.2f})."
            )

        skewed = numeric_df.skew(numeric_only=True).abs().sort_values(ascending=False)
        if not skewed.empty and skewed.iloc[0] > 1:
            insights.append(
                f"'{skewed.index[0]}' appears strongly skewed, which may indicate outliers or an uneven distribution."
            )

    categorical_df = df.select_dtypes(exclude=["number"])
    if not categorical_df.empty:
        column = categorical_df.columns[0]
        mode = categorical_df[column].mode(dropna=True)
        if not mode.empty:
            insights.append(
                f"The most common value in '{column}' is '{mode.iloc[0]}', suggesting it is a dominant category."
            )

    return insights


def analyze_dataset(df: pd.DataFrame) -> dict[str, Any]:
    shape = {"rows": int(df.shape[0]), "columns": int(df.shape[1])}
    column_types = get_column_types(df)
    summary_statistics = get_summary_statistics(df)
    missing_values = get_missing_values(df)
    correlation_matrix = get_correlation_matrix(df)
    insights = generate_basic_insights(df)

    return {
        "summary": {
            "shape": shape,
            "summary_statistics": summary_statistics,
            "missing_values": missing_values,
            "correlation_matrix": correlation_matrix,
        },
        "columns": {
            "names": df.columns.tolist(),
            "types": column_types,
        },
        "insights": insights,
    }
