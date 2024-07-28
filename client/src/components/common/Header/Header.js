import React from 'react';

import DesktopHeader from './DesktopHeader/DesktopHeader';
import MobileHeader from './MobileHeader';
import { useWindowSize } from '@_hooks/useWindowSize';

export default function App() {
  const { width: screenWidth } = useWindowSize();

  return screenWidth <= 768 ? <MobileHeader /> : <DesktopHeader />;
}
