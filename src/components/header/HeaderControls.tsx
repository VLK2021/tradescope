import {
    LangSwitcher,
    ThemeSwitcher,
} from "@/src/components";

const HeaderControls = () => {
    return (
        <div className="flex items-center justify-end gap-2 sm:gap-3">
            <LangSwitcher />
            <ThemeSwitcher />
        </div>
    );
};

export {HeaderControls};