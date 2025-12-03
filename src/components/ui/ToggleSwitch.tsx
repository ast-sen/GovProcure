interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  activeColor?: string;
}

export const ToggleSwitch = ({ checked, onChange, activeColor = 'bg-blue-600' }: ToggleSwitchProps) => (
  <div
    className={`w-14 h-8 rounded-full transition-colors cursor-pointer ${checked ? activeColor : 'bg-gray-400'}`}
    onClick={onChange}
  >
    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${checked ? 'translate-x-7 ml-1' : 'translate-x-1'}`} />
  </div>
);