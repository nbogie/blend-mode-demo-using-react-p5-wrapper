import { BlendModeInfo, createBlendModeInfos } from "./BlendModeInfo";

export interface BlendModeSelectorProps {
    selectedBlendMode: BlendModeInfo;
    setBlendMode: (mode: BlendModeInfo) => void;
}
export function BlendModeSelector(props: BlendModeSelectorProps) {
    const modesToChooseFrom = createBlendModeInfos().filter(bm => !bm.skip);
    return <div className='blendModeSelectorButtonSet'>
        {modesToChooseFrom.map(mode => {
            const isSelected = props.selectedBlendMode.name === mode.name;

            return <button title={mode.description}
                className={isSelected ? "selected" : ""}
                key={mode.name}
                onClick={() => props.setBlendMode(mode)}
            >{mode.name}</button>;
        })}
    </div>
}

