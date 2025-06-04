import { forwardRef, useImperativeHandle, useState } from "react";

export type ToggleVisibilityButtonHandle = {
  isPublic: () => boolean;
  setPublic: (value: boolean) => void;
};

interface ToggleVisibilityButtonProps {
  initialValue?: boolean;
}

// 체크박스+체크 이모지 컴포넌트
function CheckWithBox({ checked }: { checked: boolean }) {
  return (
    <span className="mr-6 relative inline-block h-full align-middle top-0.5">
      <span
        className={`absolute left-1 top-0 ${checked ? "opacity-100" : "opacity-0"}`}
        style={{ pointerEvents: "none", fontSize: "1.2rem", lineHeight: "1.2rem" }}
      >
        ✓
      </span>
      <span
        className="absolute left-0 top-0"
        style={{ pointerEvents: "none", fontSize: "1.2rem", lineHeight: "1.2rem" }}
      >
        ☐
      </span>
    </span>
  );
}

const ToggleVisibilityButton = forwardRef<ToggleVisibilityButtonHandle, ToggleVisibilityButtonProps>(
  ({ initialValue = true }, ref) => {
    const [publicState, setPublicState] = useState(initialValue);

    useImperativeHandle(ref, () => ({
      isPublic: () => publicState,
      setPublic: (value: boolean) => setPublicState(value),
    }));

    return (
      <div className="flex gap-2 ml-2">
        <button
          type="button"
          className={`w-20 py-1 text-sm font-medium border flex items-center justify-center rounded-md
            ${publicState
              ? " text-green-700"
              : "border-gray-400 text-gray-400"
            }`}
          onClick={() => setPublicState(true)}
        >
          <CheckWithBox checked={publicState} />
          공개
        </button>
        <button
          type="button"
          className={`w-20 py-1 text-sm font-medium border flex items-center justify-center rounded-md
            ${!publicState
              ? " text-green-700"
              : "border-gray-400 text-gray-400"
            }`}
          onClick={() => setPublicState(false)}
        >
          <CheckWithBox checked={!publicState} />
          비공개
        </button>
      </div>
    );
  }
);

ToggleVisibilityButton.displayName = "ToggleVisibilityButton";
export default ToggleVisibilityButton;
