const tokens = {
  colors: {
    primary: 'bg-gradient-to-br from-[#00D4FF] to-[#0080FF]',
    primaryHex: '#00D4FF',
    secondaryHex: '#0080FF',
    primaryText: 'text-white',
    text: {
      main: 'text-slate-900',
      muted: 'text-slate-500',
      light: 'text-slate-400',
    },
    background: {
      main: 'bg-white',
      soft: 'bg-slate-50',
      dark: 'bg-slate-900',
    },
    surface: {
      main: 'bg-white/80',
      hover: 'hover:bg-slate-50/50',
      active: 'active:bg-slate-100',
    },
    border: 'border-slate-100',
    status: {
      online: 'bg-[#00FF88]',
      offline: 'bg-slate-300',
    },
    shadows: {
      primary: 'shadow-lg shadow-[#00D4FF]/30',
      soft: 'shadow-sm shadow-black/5',
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  typography: {
    h1: 'text-[28px] font-bold tracking-tight',
    h2: 'text-[20px] font-semibold',
    h3: 'text-[17px] font-semibold',
    body: 'text-[15px]',
    small: 'text-[13px]',
    xs: 'text-[11px]'
  }
};

export default tokens;
