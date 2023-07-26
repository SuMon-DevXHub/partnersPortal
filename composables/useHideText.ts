export function useHideText() {
  const demoHeight = ref('300px')
  const hideText = (workflow: string, updateDemoHeight: any) => {
    if (workflow === 'live') {
      if (updateDemoHeight) {
        demoHeight.value = '385px'
      }
      return false
    } else {
      if (updateDemoHeight) {
        demoHeight.value = '385px'
      }
      return true
    }
  }
  return { hideText, demoHeight }
}