import { BlendModeInfo, createBlendModeInfos } from "./BlendModeInfo";
import { Button, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'

export interface BlendModeSelectorProps {
    selectedBlendMode: BlendModeInfo;
    setBlendMode: (mode: BlendModeInfo) => void;
}
export function BlendModeSelector(props: BlendModeSelectorProps) {
    const modesToChooseFrom = createBlendModeInfos().filter(bm => !bm.skip);
    return <div className='blendModeSelectorButtonSet'>
        <Wrap spacing='10px' justify={'center'}>
            {modesToChooseFrom.map(mode => {

                const isSelected = props.selectedBlendMode.name === mode.name;

                return (
                    <WrapItem key={mode.name}>
                        <Button title={mode.description}
                            className={isSelected ? "selected" : ""}

                            variant={isSelected ? 'solid' : 'outline'}

                            onClick={() => props.setBlendMode(mode)}
                        >  <Tooltip label={mode.description}>
                                {mode.name}
                            </Tooltip></Button>
                    </WrapItem>
                );
            })}
        </Wrap>
    </div>
}

