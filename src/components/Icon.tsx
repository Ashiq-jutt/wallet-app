import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, G } from 'react-native-svg';
import { colors } from '../theme';

export type IconName =
  | 'home' | 'card' | 'user' | 'stats' | 'bell' | 'more' | 'back' | 'forward'
  | 'plus' | 'search' | 'send' | 'wallet' | 'receive' | 'settings' | 'lock'
  | 'mail' | 'eye' | 'eye-off' | 'check' | 'filter' | 'calendar' | 'logout'
  | 'shield' | 'help' | 'moon' | 'trash' | 'edit' | 'close' | 'phone'
  | 'share' | 'download' | 'copy' | 'arrow-up' | 'arrow-down' | 'star'
  | 'globe' | 'gift' | 'grid' | 'contactless' | 'fingerprint';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export default function Icon({ name, size = 22, color = colors.text, strokeWidth = 1.8 }: Props) {
  const p = { stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G>{render(name, p, color)}</G>
    </Svg>
  );
}

function render(name: IconName, p: any, color: string) {
  switch (name) {
    case 'home':
      return <Path {...p} d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20z" />;
    case 'card':
      return (<>
        <Rect {...p} x="2.5" y="5.5" width="19" height="13" rx="3" />
        <Line {...p} x1="2.5" y1="10" x2="21.5" y2="10" />
      </>);
    case 'user':
      return (<>
        <Circle {...p} cx="12" cy="8" r="3.6" />
        <Path {...p} d="M4.5 20.5c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" />
      </>);
    case 'stats':
      return (<>
        <Line {...p} x1="6" y1="20" x2="6" y2="12" />
        <Line {...p} x1="12" y1="20" x2="12" y2="4" />
        <Line {...p} x1="18" y1="20" x2="18" y2="9" />
      </>);
    case 'bell':
      return (<>
        <Path {...p} d="M18 8.5a6 6 0 1 0-12 0c0 6-2 7.5-2 7.5h16s-2-1.5-2-7.5" />
        <Path {...p} d="M13.7 20a2 2 0 0 1-3.4 0" />
      </>);
    case 'more':
      return (<>
        <Circle cx="12" cy="5" r="1.7" fill={color} />
        <Circle cx="12" cy="12" r="1.7" fill={color} />
        <Circle cx="12" cy="19" r="1.7" fill={color} />
      </>);
    case 'grid':
      return (<>
        <Rect {...p} x="3" y="3" width="7.5" height="7.5" rx="2" />
        <Rect {...p} x="13.5" y="3" width="7.5" height="7.5" rx="2" />
        <Rect {...p} x="3" y="13.5" width="7.5" height="7.5" rx="2" />
        <Rect {...p} x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
      </>);
    case 'back':
      return <Polyline {...p} points="15 4 7 12 15 20" />;
    case 'forward':
      return <Polyline {...p} points="9 4 17 12 9 20" />;
    case 'plus':
      return (<>
        <Line {...p} x1="12" y1="5" x2="12" y2="19" />
        <Line {...p} x1="5" y1="12" x2="19" y2="12" />
      </>);
    case 'close':
      return (<>
        <Line {...p} x1="6" y1="6" x2="18" y2="18" />
        <Line {...p} x1="18" y1="6" x2="6" y2="18" />
      </>);
    case 'search':
      return (<>
        <Circle {...p} cx="11" cy="11" r="6.5" />
        <Line {...p} x1="16" y1="16" x2="21" y2="21" />
      </>);
    case 'send':
      return <Path {...p} d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 10z" />;
    case 'wallet':
      return (<>
        <Path {...p} d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1.5" />
        <Rect {...p} x="3" y="7.5" width="18" height="12" rx="3" />
        <Circle cx="16.5" cy="13.5" r="1.4" fill={color} />
      </>);
    case 'receive':
      return <Path {...p} d="M12 4v13m0 0 5.5-5.5M12 17l-5.5-5.5M4 21h16" />;
    case 'arrow-up':
      return <Path {...p} d="M12 19V6m0 0 6 6m-6-6-6 6" />;
    case 'arrow-down':
      return <Path {...p} d="M12 5v13m0 0 6-6m-6 6-6-6" />;
    case 'settings':
      return (<>
        <Circle {...p} cx="12" cy="12" r="3" />
        <Path {...p} d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.2a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.8 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.2a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.1 1.3z" />
      </>);
    case 'lock':
      return (<>
        <Rect {...p} x="4.5" y="10" width="15" height="10.5" rx="3" />
        <Path {...p} d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      </>);
    case 'mail':
      return (<>
        <Rect {...p} x="2.5" y="5" width="19" height="14" rx="3" />
        <Path {...p} d="m3.5 7 8.5 6 8.5-6" />
      </>);
    case 'eye':
      return (<>
        <Path {...p} d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12" />
        <Circle {...p} cx="12" cy="12" r="2.8" />
      </>);
    case 'eye-off':
      return (<>
        <Path {...p} d="M9.9 5.7A9.9 9.9 0 0 1 12 5.5c6.2 0 10 6.5 10 6.5a17 17 0 0 1-3.2 4M6.3 7.9A17 17 0 0 0 2 12s3.8 6.5 10 6.5c1.5 0 2.8-.3 4-.8" />
        <Line {...p} x1="3" y1="3" x2="21" y2="21" />
      </>);
    case 'check':
      return <Polyline {...p} points="4 12.5 9.5 18 20 6" />;
    case 'filter':
      return <Path {...p} d="M3 5h18l-7 8v6l-4 2v-8z" />;
    case 'calendar':
      return (<>
        <Rect {...p} x="3.5" y="5" width="17" height="15" rx="3" />
        <Line {...p} x1="3.5" y1="10" x2="20.5" y2="10" />
        <Line {...p} x1="8" y1="3" x2="8" y2="6.5" />
        <Line {...p} x1="16" y1="3" x2="16" y2="6.5" />
      </>);
    case 'logout':
      return <Path {...p} d="M15 17.5v1.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1.5M10 12h11m0 0-3.5-3.5M21 12l-3.5 3.5" />;
    case 'shield':
      return <Path {...p} d="M12 2.5 20 6v6c0 5-3.4 8.3-8 9.5-4.6-1.2-8-4.5-8-9.5V6z" />;
    case 'help':
      return (<>
        <Circle {...p} cx="12" cy="12" r="9" />
        <Path {...p} d="M9.5 9.5a2.6 2.6 0 1 1 3.5 2.4c-.7.3-1 .9-1 1.6v.3" />
        <Circle cx="12" cy="17" r="1.1" fill={color} />
      </>);
    case 'moon':
      return <Path {...p} d="M21 13.5A9 9 0 0 1 10.5 3a9 9 0 1 0 10.5 10.5" />;
    case 'trash':
      return (<>
        <Path {...p} d="M4 7h16M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" />
        <Path {...p} d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12" />
      </>);
    case 'edit':
      return <Path {...p} d="M4 20h4l10-10-4-4L4 16zM14 6l4 4" />;
    case 'phone':
      return <Path {...p} d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A17.5 17.5 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3z" />;
    case 'share':
      return (<>
        <Circle {...p} cx="18" cy="5.5" r="2.6" />
        <Circle {...p} cx="6" cy="12" r="2.6" />
        <Circle {...p} cx="18" cy="18.5" r="2.6" />
        <Path {...p} d="m8.3 10.8 7.4-4M8.3 13.2l7.4 4" />
      </>);
    case 'download':
      return <Path {...p} d="M12 3v11m0 0 4.5-4.5M12 14 7.5 9.5M4 20h16" />;
    case 'copy':
      return (<>
        <Rect {...p} x="9" y="9" width="12" height="12" rx="3" />
        <Path {...p} d="M15 6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1" />
      </>);
    case 'star':
      return <Path {...p} d="m12 3.5 2.7 5.6 6.1.8-4.5 4.3 1.2 6.1L12 17.4 6.5 20.3l1.2-6.1L3.2 9.9l6.1-.8z" />;
    case 'globe':
      return (<>
        <Circle {...p} cx="12" cy="12" r="9" />
        <Path {...p} d="M3 12h18M12 3c2.5 2.8 2.5 15.2 0 18-2.5-2.8-2.5-15.2 0-18" />
      </>);
    case 'gift':
      return (<>
        <Rect {...p} x="3" y="8.5" width="18" height="4" rx="1.5" />
        <Path {...p} d="M4.5 12.5V19a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6.5M12 8.5V21" />
        <Path {...p} d="M12 8.5S10.5 3 8 3a2.5 2.5 0 0 0 0 5.5zM12 8.5S13.5 3 16 3a2.5 2.5 0 0 1 0 5.5z" />
      </>);
    case 'contactless':
      return (<>
        <Path {...p} d="M8 7.5a7 7 0 0 1 0 9" />
        <Path {...p} d="M11.5 5.5a11 11 0 0 1 0 13" />
        <Path {...p} d="M15 3.5a15 15 0 0 1 0 17" />
      </>);
    case 'fingerprint':
      return (<>
        <Path {...p} d="M12 3.5a8.5 8.5 0 0 0-8.5 8.5v2" />
        <Path {...p} d="M20.5 12a8.5 8.5 0 0 0-4.3-7.4" />
        <Path {...p} d="M7.5 12a4.5 4.5 0 0 1 9 0v3a5 5 0 0 1-.6 2.4" />
        <Path {...p} d="M11 12a1 1 0 0 1 2 0v4a6 6 0 0 1-.6 2.6" />
        <Path {...p} d="M7.6 17.5A6 6 0 0 0 8 20.5" />
      </>);
    default:
      return null;
  }
}
