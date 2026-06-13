export type BentoSpanConfig = {
  imageIndex: number;
  colSpan: number;
  rowSpan: number;
};

export type BentoLayoutCell = {
  imageIndex: number | null;
  colSpan: number;
  rowSpan: number;
  gridColumn: number;
  gridRow: number;
  cellIndex: number;
};

export function computeBentoGridLayout(
  gridColumns: number,
  gridRows: number,
  itemCount: number,
  enableSpanning: boolean,
  spanConfig: BentoSpanConfig[],
): BentoLayoutCell[] {
  if (!enableSpanning) {
    const totalCells = gridColumns * gridRows;
    return Array.from({ length: totalCells }, (_, index) => ({
      imageIndex: itemCount > 0 ? index % itemCount : null,
      colSpan: 1,
      rowSpan: 1,
      gridColumn: (index % gridColumns) + 1,
      gridRow: Math.floor(index / gridColumns) + 1,
      cellIndex: index,
    }));
  }

  const grid = Array.from({ length: gridRows }, () => Array(gridColumns).fill(false));
  const layout: BentoLayoutCell[] = [];
  const usedItems = new Set<number>();

  spanConfig.forEach((span) => {
    if (span.imageIndex >= itemCount || usedItems.has(span.imageIndex)) return;

    for (let row = 0; row <= gridRows - span.rowSpan; row++) {
      for (let col = 0; col <= gridColumns - span.colSpan; col++) {
        let canPlace = true;
        for (let r = row; r < row + span.rowSpan && canPlace; r++) {
          for (let c = col; c < col + span.colSpan; c++) {
            if (grid[r][c]) canPlace = false;
          }
        }
        if (!canPlace) continue;

        for (let r = row; r < row + span.rowSpan; r++) {
          for (let c = col; c < col + span.colSpan; c++) {
            grid[r][c] = true;
          }
        }
        layout.push({
          imageIndex: span.imageIndex,
          colSpan: span.colSpan,
          rowSpan: span.rowSpan,
          gridColumn: col + 1,
          gridRow: row + 1,
          cellIndex: layout.length,
        });
        usedItems.add(span.imageIndex);
        return;
      }
    }
  });

  let currentIndex = 0;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridColumns; col++) {
      if (grid[row][col]) continue;

      while (currentIndex < itemCount && usedItems.has(currentIndex)) {
        currentIndex++;
      }

      const imageIndex = currentIndex < itemCount ? currentIndex : null;
      layout.push({
        imageIndex,
        colSpan: 1,
        rowSpan: 1,
        gridColumn: col + 1,
        gridRow: row + 1,
        cellIndex: layout.length,
      });

      if (imageIndex !== null) {
        usedItems.add(imageIndex);
        currentIndex++;
      }
    }
  }

  return layout;
}

export function defaultBentoSpanConfig(): BentoSpanConfig[] {
  return [{ imageIndex: 0, colSpan: 2, rowSpan: 2 }];
}

export function defaultBentoGridSize() {
  return { columns: 3, rows: 3 };
}
