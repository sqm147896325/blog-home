// 使 import.meta.env 不报错
interface ImportMeta {
  env: ImportMetaEnv<any>
}