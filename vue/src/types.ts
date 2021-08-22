export type TNav = {
    label: string,
    value: string,
    disabled?: boolean,
}
export type TNavBox = {
	title: string
    navList: TNav[]
}
export type TRoute = {
	path: string
	component: () => Promise<any>
}