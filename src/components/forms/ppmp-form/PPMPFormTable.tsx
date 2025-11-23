import { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, X } from 'lucide-react';
import { PPMPItem } from '../../../types/ppmp.types';
import { MONTHS } from '../../../utils/constants/ppmp.constants';
import { useSidebarWidth } from '../../layout/Layout';
import { useTheme } from '../../../context/ThemeContext';

const DEFAULT_CATEGORIES = [
  'COMMON USED SUPPLIES',
  'PLANT, PROPERTY & EQUIPMENTS',
  'FUELS',
  'LUBRICANTS',
  'PLUMBING',
  'ELECTRICAL',
  'MEDICINE',
  'FOODSTUFF',
  'AGRICULTURAL SUPPLY',
  'SPAREPARTS',
  'COMPUTER & LAPTOP',
  'JANITORIAL SERVICES',
  'MEDICAL SUPPLY',
  'PERSONAL HYGIENE',
  'E-LOAD'
];

interface PPMPFormTableProps {
  items: PPMPItem[];
  onUpdateItem: (id: string, field: keyof PPMPItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (category?: string) => void;
}

export const PPMPFormTable: React.FC<PPMPFormTableProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem
}) => {
  const { sidebarWidth } = useSidebarWidth();
  const { darkMode, styles } = useTheme();

  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const theadBg = darkMode ? 'bg-gray-700' : 'bg-gray-100';
  const theadText = darkMode ? 'text-gray-200' : 'text-gray-700';
  const subheadBg = darkMode ? 'bg-gray-600' : 'bg-gray-50';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-800';
  const categoryHeaderBg = darkMode ? 'bg-gray-900/90' : 'bg-gray-50';
  const categoryText = darkMode ? 'text-blue-300' : 'text-blue-800';
  const categorySubText = darkMode ? 'text-blue-400' : 'text-blue-600';
  const qtyColBg = darkMode ? 'bg-blue-900/30' : 'bg-blue-50';
  const amtColBg = darkMode ? 'bg-green-900/30' : 'bg-green-50';
  const rowHoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const emptyRowBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const addRowBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const scrollbarBg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400';

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    const scrollBar = scrollBarRef.current;
    if (!tableContainer || !scrollBar) return;

    const handleTableScroll = () => { scrollBar.scrollLeft = tableContainer.scrollLeft; };
    const handleScrollBarScroll = () => { tableContainer.scrollLeft = scrollBar.scrollLeft; };

    tableContainer.addEventListener('scroll', handleTableScroll);
    scrollBar.addEventListener('scroll', handleScrollBarScroll);
    return () => {
      tableContainer.removeEventListener('scroll', handleTableScroll);
      scrollBar.removeEventListener('scroll', handleScrollBarScroll);
    };
  }, []);
  
  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  const addCategory = (category: string) => {
    if (!activeCategories.includes(category)) {
      setActiveCategories([...activeCategories, category]);
    }
    setShowAddCategory(false);
  };

  const removeCategory = (category: string) => {
    const categoryItems = groupedItems[category] || [];
    if (categoryItems.length > 0) {
      if (!confirm(`This category has ${categoryItems.length} item(s). Are you sure you want to remove it? All items will be deleted.`)) {
        return;
      }
      categoryItems.forEach(item => onRemoveItem(item.id));
    }
    setActiveCategories(activeCategories.filter(c => c !== category));
  };

  const groupedItems = items.reduce<Record<string, PPMPItem[]>>((acc, item) => {
    const category = item.category || 'COMMON USED SUPPLIES';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const existingCategories = Object.keys(groupedItems);
  const newActiveCategories = activeCategories.filter(cat => !existingCategories.includes(cat));
  const displayCategories = [...existingCategories, ...newActiveCategories];
  const availableCategories = DEFAULT_CATEGORIES.filter(cat => !displayCategories.includes(cat));

  return (
    <>
      <div className="p-6">
        <div ref={tableContainerRef} className="overflow-x-auto overflow-y-hidden pb-6 hide-scrollbar">
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
          <div className="min-w-max">
            <table className="w-full border-collapse">
              <thead>
                <tr className={theadBg}>
                  <th className={`border ${borderColor} px-2 py-3 text-xs font-semibold ${theadText} text-center no-print`} rowSpan={3}>Actions</th>
                  <th className={`border ${borderColor} px-3 py-3 text-xs font-semibold ${theadText} text-center`} rowSpan={3}>General<br/>Description</th>
                  <th className={`border ${borderColor} px-3 py-3 text-xs font-semibold ${theadText} text-center`} rowSpan={3}>Unit</th>
                  <th className={`border ${borderColor} px-3 py-3 text-xs font-semibold ${theadText} text-center`} rowSpan={3}>Qty/Size</th>
                  <th className={`border ${borderColor} px-3 py-3 text-xs font-semibold ${theadText} text-center`} rowSpan={3}>Estimated<br/>Budget</th>
                  <th className={`border ${borderColor} px-2 py-3 text-xs font-semibold ${theadText} text-center`} colSpan={24}>Milestone of Activities</th>
                </tr>
                <tr className={theadBg}>
                  {MONTHS.map((month) => (
                    <th key={month.key} className={`border ${borderColor} px-2 py-2 text-xs font-semibold ${theadText}`} colSpan={2}>{month.name}</th>
                  ))}
                </tr>
                <tr className={subheadBg}>
                  {MONTHS.map((month) => [
                    <th key={`${month.key}-qty-label`} className={`border ${borderColor} px-2 py-1 text-xs font-semibold ${theadText} ${qtyColBg}`}>Qty</th>,
                    <th key={`${month.key}-amt-label`} className={`border ${borderColor} px-2 py-1 text-xs font-semibold ${theadText} ${amtColBg}`}>Amt</th>
                  ])}
                </tr>
              </thead>
              <tbody>
                {displayCategories.map((category) => {
                  const categoryItems = groupedItems[category] || [];
                  const isCollapsed = collapsedCategories.has(category);
                  const hasItems = categoryItems.length > 0;

                  return (
                    <>
                      <tr key={`${category}-header`} className={`${categoryHeaderBg} border-t-2 border-blue-600`}>
                        <td colSpan={30} className="px-3 py-2">
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => toggleCategory(category)}
                              className={`flex items-center gap-2 text-sm font-semibold ${categoryText} hover:opacity-80 transition-colors`}
                            >
                              {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                              <span>{category}</span>
                              {hasItems && (
                                <span className={`text-xs font-normal ${categorySubText} ml-1`}>
                                  ({categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'})
                                </span>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeCategory(category)}
                              className="flex items-center gap-1 px-2 py-1 text-red-500 hover:bg-red-500/20 rounded transition-colors no-print"
                              title="Remove category"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {!isCollapsed && hasItems && categoryItems.map((item) => (
                        <tr key={item.id} className={`${rowHoverBg} ${styles.bgCard}`}>
                          <td className={`border ${borderColor} px-2 py-2 text-center no-print`}>
                            <button type="button" onClick={() => onRemoveItem(item.id)} className="p-1 text-red-500 hover:bg-red-500/20 rounded transition-colors" title="Delete item">
                              <Trash2 size={16} />
                            </button>
                          </td>
                          <td className={`border ${borderColor} px-2 py-2`}>
                            <input type="text" value={item.generalDescription} onChange={(e) => onUpdateItem(item.id, 'generalDescription', e.target.value)} className={`w-48 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 ${inputBg}`} placeholder="Item description" />
                          </td>
                          <td className={`border ${borderColor} px-2 py-2`}>
                            <input type="text" value={item.unit} onChange={(e) => onUpdateItem(item.id, 'unit', e.target.value)} className={`w-20 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 ${inputBg}`} placeholder="pcs" />
                          </td>
                          <td className={`border ${borderColor} px-2 py-2`}>
                            <input type="text" value={item.qtySize} onChange={(e) => onUpdateItem(item.id, 'qtySize', e.target.value)} className={`w-24 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 ${inputBg}`} placeholder="0" />
                          </td>
                          <td className={`border ${borderColor} px-2 py-2`}>
                            <input type="number" value={item.estimatedBudget} onChange={(e) => onUpdateItem(item.id, 'estimatedBudget', e.target.value)} className={`w-32 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 ${inputBg}`} placeholder="0.00" step="0.01" />
                          </td>
                          {MONTHS.map((month) => [
                            <td key={`${item.id}-${month.key}-qty`} className={`border ${borderColor} px-1 py-2 ${qtyColBg}`}>
                              <input type="number" value={item[`${month.key}_qty` as keyof PPMPItem] as string} onChange={(e) => onUpdateItem(item.id, `${month.key}_qty` as keyof PPMPItem, e.target.value)} className={`w-16 px-1 py-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 ${inputBg}`} placeholder="0" />
                            </td>,
                            <td key={`${item.id}-${month.key}-amt`} className={`border ${borderColor} px-1 py-2 ${amtColBg}`}>
                              <input type="number" value={item[`${month.key}_amt` as keyof PPMPItem] as string} onChange={(e) => onUpdateItem(item.id, `${month.key}_amt` as keyof PPMPItem, e.target.value)} className={`w-20 px-1 py-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 ${inputBg}`} placeholder="0.00" step="0.01" />
                            </td>
                          ])}
                        </tr>
                      ))}

                      {!isCollapsed && !hasItems && (
                        <tr key={`${category}-empty`}>
                          <td colSpan={30} className={`border ${borderColor} px-4 py-4 text-center ${styles.textSecondary} text-sm italic ${emptyRowBg}`}>
                            No items in this category yet.
                          </td>
                        </tr>
                      )}

                      {!isCollapsed && (
                        <tr key={`${category}-add-item`}>
                          <td colSpan={30} className={`border ${borderColor} px-4 py-2 ${addRowBg}`}>
                            <button type="button" onClick={() => onAddItem(category)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                              <Plus size={20} />
                              Add New Item
                            </button>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4">
              {!showAddCategory ? (
                <button type="button" onClick={() => setShowAddCategory(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={20} />
                  Add Category
                </button>
              ) : (
                <div className={`flex items-center gap-3 p-4 border ${borderColor} rounded-lg ${addRowBg}`}>
                  <select onChange={(e) => { if (e.target.value) addCategory(e.target.value); }} className={`px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${inputBg}`} defaultValue="">
                    <option value="">Select a category...</option>
                    {availableCategories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                  <button type="button" onClick={() => setShowAddCategory(false)} className={`px-4 py-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} ${styles.textPrimary} rounded-lg transition-colors`}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scrollbar */}
      <div 
        ref={scrollBarRef}
        className={`fixed bottom-0 right-0 overflow-x-auto ${scrollbarBg} border-t-2 shadow-lg z-50 no-print`}
        style={{ height: '24px', left: `${sidebarWidth}px`, paddingLeft: '24px', paddingRight: '24px', transition: 'left 0.3s ease-in-out' }}
      >
        <div style={{ width: `${(tableContainerRef.current?.scrollWidth || 3000) + 100}px`, height: '20px', backgroundColor: 'transparent' }}></div>
      </div>
    </>
  );
};