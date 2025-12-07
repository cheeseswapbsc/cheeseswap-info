const white = '#FFFFFF'
const black = '#0A0E1A'

const green = {
  green1: '#10B981',
  green2: '#059669',
  green3: '#34D399'
}

const red = {
  red1: '#EF4444',
  red2: '#F87171',
  red3: '#DC2626'
}

const yellow = {
  yellow1: '#F59E0B',
  yellow2: '#FBBF24',
  yellow3: '#F97316'
}

const purple = {
  purple1: '#8B5CF6',
  purple2: '#A78BFA',
  purple3: '#7C3AED'
}

const blue = {
  blue1: '#3B82F6',
  blue2: '#60A5FA',
  blue3: '#2563EB'
}

const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  gold: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  cosmic: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
}

const base = {
  colors: { white, black, ...green, ...red, ...yellow, ...purple, ...blue },
  gradients,
  grids: { sm: 8, md: 12, lg: 24 },
  gradient: gradients.primary,
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  borderRadius: { sm: '8px', md: '12px', lg: '16px', xl: '24px', round: '50%' },
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.16)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.20)'
  }
}

const light = {
  ...base,
  colors: {
    ...base.colors,
    shadow1: 'rgba(0, 0, 0, 0.1)',
    text1: '#1F2937',
    text2: '#4B5563',
    text3: '#6B7280',
    text4: '#9CA3AF',

    bg0: '#F9FAFB',
    bg1: 'rgba(255, 255, 255, 0.8)',
    bg2: 'rgba(249, 250, 251, 0.7)',
    bg3: 'rgba(243, 244, 246, 0.6)',
    bg4: 'rgba(229, 231, 235, 0.5)',
    bg5: 'rgba(209, 213, 219, 0.4)',
    // Use a subtle solid background color instead of a gradient so color functions work
    bg6: '#F3F4F6',

    modalBG: 'rgba(0, 0, 0, 0.4)',
    advancedBG: 'rgba(255, 255, 255, 0.7)',

    primary1: '#667eea',
    primary2: '#764ba2',
    primary3: '#8B5CF6',
    primary4: '#A78BFA',
    primary5: '#C4B5FD',
    primary6: 'rgba(102, 126, 234, 0.1)',

    /* link color used across app (fallback for components that expect theme.link) */
    link: '#667eea',

    primaryText1: '#FFFFFF',
    buttonText: '#FFFFFF',

    secondary1: '#10B981',
    secondary2: '#34D399',
    secondary3: '#6EE7B7'
  }
}

const dark = {
  ...base,
  colors: {
    ...base.colors,
    shadow1: 'rgba(0, 0, 0, 0.5)',
    text1: '#F3F4F6',
    text2: '#9CA3AF',
    text3: '#6B7280',
    text4: '#4B5563',

    bg0: '#0A0E1A',
    bg1: 'rgba(17, 24, 39, 0.85)',
    bg2: 'rgba(31, 41, 55, 0.7)',
    bg3: 'rgba(55, 65, 81, 0.6)',
    bg4: 'rgba(75, 85, 99, 0.5)',
    bg5: 'rgba(107, 114, 128, 0.4)',
    // Use a subtle solid background color for dark theme as well
    bg6: '#0B1220',

    modalBG: 'rgba(0, 0, 0, 0.5)',
    advancedBG: 'rgba(17, 24, 39, 0.7)',

    primary1: '#667eea',
    primary2: '#764ba2',
    primary3: '#8B5CF6',
    primary4: '#A78BFA',
    primary5: '#C4B5FD',
    primary6: 'rgba(102, 126, 234, 0.1)',

    /* link color used across app (fallback for components that expect theme.link) */
    link: '#667eea',

    primaryText1: '#FFFFFF',
    buttonText: '#FFFFFF',

    secondary1: '#10B981',
    secondary2: '#34D399',
    secondary3: '#6EE7B7'
  }
}

export default function getTheme(darkMode) {
  const t = darkMode ? dark : light
  // Merge color tokens to the top-level for backward compatibility (theme.text1, theme.link, etc.)
  return {
    ...t,
    ...t.colors
  }
}

