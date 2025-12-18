/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 사용하실 환경 변수들을 여기에 정의하면 자동 완성이 지원됩니다.
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}