import {TNavBox} from '../../../types'

const navBoxList: TNavBox[] = [
      {
        title: 'basic',
        navList: [
          {
            label: 'html',
            value: 'html',
            disabled: false,
          },
          {
            label: 'js',
            value: 'js',
            disabled: false,
          },
          {
            label: 'ts',
            value: 'ts',
            disabled: false,
          },
          {
            label: 'vue',
            value: 'vue',
            disabled: false,
          },
          {
            label: 'react',
            value: 'react',
            disabled: false,
          },
          {
            label: 'angular',
            value: 'angular',
            disabled: false,
          },
          {
            label: 'data-structure',
            value: 'data-structure',
            disabled: false,
          },
        ],
      },
      {
        title: 'promote',
        navList: [
          {
            label: '工程化',
            value: 'engineered',
            disabled: false,
          },
          {
            label: 'proxy',
            value: 'proxy',
            disabled: false,
          },
        ],
      },
      {
        title: 'development',
        navList: [
          {
            label: 'none',
            value: 'none',
            disabled: true,
          },
        ],
      },
    ]
// export default {
// 	navBoxList
// }
// export default navBoxList
export {
  navBoxList
}

// {
//   "navBoxList": [
//     {
//       label: '工程化',
//       value: 'engineered',
//       disabled: true,
//     }
//   ]
// }