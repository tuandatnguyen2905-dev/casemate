import{VisualView}from'./fashionVisualKit';import{ELECTRONICS_M1_VISUALS}from'./electronicsM1VisualSpecs';
export function renderElectronicsModule01Visual(kind:string){const visual=ELECTRONICS_M1_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
