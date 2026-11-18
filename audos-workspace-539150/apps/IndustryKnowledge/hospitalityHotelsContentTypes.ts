import type{HotelSourceId}from'./hospitalityHotelsCore';

/**
 * Chapter-specific text for the Hotels & Resorts curriculum, keyed by `m{module}-{chapter number in module}`.
 * i = key insight, w = What it is, y = Why it is happening, e = Real-world example, v = Vietnam example,
 * b = Business impact, s = cited source ids, t = key terms as [term, definition, optional source id that defines it].
 * A source id means that source directly supports the definition; it is preserved on the learner-facing term.
 * Terms without a source id are general-usage definitions that still require expert review before being called verified.
 * Chapter source lists support the cited claims but do not automatically verify every sentence or current legal status.
 */
export interface HotelChapterContent{i:string;w:string;y:string;e:string;v:string;b:string;s:HotelSourceId[];t:Array<[string,string,HotelSourceId?]>}
