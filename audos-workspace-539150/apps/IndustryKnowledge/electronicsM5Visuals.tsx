import{VisualView}from'./fashionVisualKit';import{ELECTRONICS_M5_VISUALS}from'./electronicsM5VisualSpecs';
export function renderElectronicsModule05Visual(k:string){const visual=ELECTRONICS_M5_VISUALS[k];return visual?<VisualView spec={visual.spec}/>:null;}
