export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    },
    input: {
      defaultVariants: {
        size: 'md'
      }
    },
    pinInput: {
      defaultVariants: {
        size: 'md'
      }
    },
    dashboardPanel: {
      slots: {
        body: 'scrollbar-thin'
      }
    }
  }
})
