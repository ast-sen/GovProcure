import { BaseApprovalItem, TableColumn } from '../../types/approval.types';
import { useTheme } from '../../context/ThemeContext';

interface ApprovalTableProps<T extends BaseApprovalItem> {
  items: T[];
  columns: TableColumn<T>[];
  onRowClick: (item: T) => void;
}

function ApprovalTable<T extends BaseApprovalItem>({
  items,
  columns,
  onRowClick,
}: ApprovalTableProps<T>) {
  const { styles, darkMode } = useTheme();

  const getAlignment = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const getCellValue = (item: T, column: TableColumn<T>) => {
    // If custom render function provided, use it
    if (column.render) {
      return column.render(item);
    }

    const value = (item as any)[column.key];

    // If format function provided, use it
    if (column.format && value !== undefined) {
      return column.format(value);
    }

    return value ?? '-';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${styles.border}`}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-xs font-semibold ${styles.textPrimary} uppercase ${getAlignment(column.align)}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${styles.border}`}>
          {items.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick(item)}
              className={`${styles.hoverBg} transition-colors cursor-pointer`}
            >
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className={`px-4 py-3 text-sm ${getAlignment(column.align)} ${
                    column.key === 'amount' 
                      ? `font-medium ${styles.textPrimary}` 
                      : styles.textSecondary
                  }`}
                >
                  {getCellValue(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovalTable;