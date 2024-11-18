module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      aspectRatio: {
        'video': '16 / 9',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              fontWeight: '700',
            },
            h2: {
              fontWeight: '600',
            },
            h3: {
              fontWeight: '600',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.5em',
            },
            'ol > li': {
              position: 'relative',
              paddingLeft: '1.5em',
            },
            strong: {
              fontWeight: '600',
              color: '#111827',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'opacity-0',
    'opacity-100',
    'transition-opacity',
    'duration-500',
    'ease-out',
    'line-clamp-1',
    'line-clamp-2',
    'line-clamp-3',
    'aspect-video'
  ]
};