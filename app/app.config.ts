export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    },
    input: {
      defaultVariants: {
        size: 'xl'
      }
    },
    pinInput: {
      defaultVariants: {
        size: 'xl'
      }
    },
    dashboardPanel: {
      slots: {
        body: 'scrollbar-thin'
      }
    }
  }
})
