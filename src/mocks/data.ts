export type MockItem = {
  id: number
  title: string
  body: string
}

// generate 131+ mock items  ==> total 181 items
export const ITEMS: MockItem[] = Array.from({ length: 181 }, (_, i) => ({
  id: i + 1,
  title: `Mock Item #${i + 1}`,
  body: `This is a sample description for item number ${i + 1}. It demonstrates content of varying length to test layout.`,
}))
