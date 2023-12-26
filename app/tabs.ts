

export type TabType = {
    title: string,
    slug: string
}
export const tabs: TabType[] = [
    {
        title: "Топ-предложения",
        slug: "best"
    },
    {
        title: "Свежие",
        slug: "fresh"
    },
    {
        title: "До 500 000 ₽",
        slug: "before-500"
    },
    {
        title: "7-местные",
        slug: "seats-7"
    },
    {
        title: "До 2 владельцев",
        slug: "owners-2"
    },
    {
        title: "До 5 лет",
        slug: "young"
    },
    {
        title: "Седаны",
        slug: "sedan"
    },
    {
        title: "Премиум",
        slug: "premium"
    }
]
export let currentTab = ref<TabType>(tabs[0])
export const tabClick = async (tab: TabType) => {
    currentTab.value = tab
}