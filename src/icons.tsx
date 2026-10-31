import type {SVGProps} from 'react';
type Props=SVGProps<SVGSVGElement>&{size?:number};
function Icon({size=24,children,...props}:Props){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>;}
export const ArrowDown=(p:Props)=><Icon {...p}><path d="M12 4v16m-6-6 6 6 6-6"/></Icon>;
export const ArrowDownRight=(p:Props)=><Icon {...p}><path d="m5 5 14 14M5 19h14V5"/></Icon>;
export const ArrowUpRight=(p:Props)=><Icon {...p}><path d="M5 19 19 5M5 5h14v14"/></Icon>;
export const Menu=(p:Props)=><Icon {...p}><path d="M4 6h16M4 12h16M4 18h16"/></Icon>;
export const X=(p:Props)=><Icon {...p}><path d="m6 6 12 12M6 18 18 6"/></Icon>;
export const MessageCircle=(p:Props)=><Icon {...p}><path d="M21 11.5a9 9 0 0 1-13.5 8L3 21l1.5-4.5A9 9 0 1 1 21 11.5Z"/></Icon>;
