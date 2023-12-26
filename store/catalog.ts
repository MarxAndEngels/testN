import {defineStore} from 'pinia'


type ThemeType = {
    slug: string
    main: string
    text: string
}

export const useCatalog = defineStore('catalog', {
    state: () => ({
        themes: <ThemeType[]>[
            {
                slug: 'kia',
                main: '#05141F',
                text: '#05141F'
            },
            {
                slug: 'hyundai',
                main: '#163B6E',
                text: '#163B6E'
            },
            {
                slug: 'skoda',
                main: '#64A642',
                text: '#64A642'
            },
            {
                slug: 'volkswagen',
                main: '#004080',
                text: '#004180'
            },
            {
                slug: 'renault',
                main: '#000000',
                text: '#EFDF00'
            },
            {
                slug: 'nissan',
                main: '#000302',
                text: '#C3002F'
            },
            {
                slug: 'uaz',
                main: '#014637',
                text: '#014637'
            },
            {
                slug: 'geely',
                main: '#343E47',
                text: '#343E47'
            },
            {
                slug: 'mazda',
                main: '#101010',
                text: '#910A2D'
            },
            {
                slug: 'haval',
                main: '#000001',
                text: '#000001'
            },
            {
                slug: 'changan',
                main: '#1E447B',
                text: '#1E447B'
            },
            {
                slug: 'chery',
                main: '#000000',
                text: '#982932'
            },
            {
                slug: 'toyota',
                main: '#282830',
                text: '#D40605'
            },
            {
                slug: 'dongfeng',
                main: '#E40521',
                text: '#E40521'
            },
            {
                slug: 'jac',
                main: '#BB2720',
                text: '#BB2720'
            },
            {
                slug: 'moskvich',
                main: '#D6001C',
                text: '#000000'
            },
            {
                slug: 'kaiyi',
                main: '#000000',
                text: '#000000'
            },
            {
                slug: 'exeed',
                main: '#31363A',
                text: '#BF906C'
            },
            {
                slug: 'omoda',
                main: '#30363A',
                text: '#6DBCE7'
            },
            {
                slug: 'lada',
                main: '#4C5865',
                text: '#E6873B'
            },
            {
              slug: 'jetour',
              main: '#ff874a',
              text: '#4c4c4c'
            },
            {
              slug: 'livan',
              main: '#27282a',
              text: '#27282a'
            },
            {
              slug: 'voyah',
              text: '#3a73ba',
              main: '#202430'
            },
            {
              slug: 'forthing',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'baic',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'evolute',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'skywell',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'gac',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'foton',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'faw',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'honda',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'tank',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'chevrolet',
              main: '#4C5865',
              text: '#E6873B'
            },
            {
              slug: 'avatr',
              main: '#4C5865',
              text: '#E6873B'
            },
        ],
        colorTheme: <ThemeType>{
            slug: 'default',
            main: '',
            text: ''
        },
        catalogMenu: false
    }),

    actions: {
        async setColorTheme(data: any) {
            this.colorTheme = data
        },
        async setCatalogMenu(data: boolean) {
            this.catalogMenu = data
        }
    }
})