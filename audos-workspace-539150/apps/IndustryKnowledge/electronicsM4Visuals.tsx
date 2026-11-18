import{VisualView}from'./fashionVisualKit';import{ELECTRONICS_M4_VISUALS}from'./electronicsM4VisualSpecs';
export function renderElectronicsModule04Visual(k:string){const visual=ELECTRONICS_M4_VISUALS[k];return visual?<VisualView spec={visual.spec}/>:null;}
