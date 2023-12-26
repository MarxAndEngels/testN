export default {
banksQuery: `query banks($site_id: Int) {
  banks(site_id: $site_id) {
    id
    name
    title
    slug
    license_title
    license_file
    request
    approval
    rating
    rate
    image
  }
}`
}
export type BanksTypeData = {
    banks: BankType[]
}
export type BankType = {
    id: number
    name: string
    title: string
    slug: string
    license_title: string
    license_file: string
    request: number
    approval: number
    rating: number
    rate: number
    image: string
}