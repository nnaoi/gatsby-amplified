import React, { ReactElement, useState } from "react"
import { useTranslation } from "react-i18next"

import SEO from "../components/seo"

interface Props {}

function Index(_props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title="Gatsby Typescript TailWind CSS"
        description={t(
          "（また個性がしうちずべくたでなは申しありですが、）まだ知れまし顔を、dutyの学校なりできて思わに従って、警視総監の学習は今の所ばかりあり見るものへ上るたて下宿地考えけれどもじまいませといったご羽根ないのう。"
        )}
        og={{
          title: "Gatsby Typescript TailWind CSS",
          description: t(
            "（また個性がしうちずべくたでなは申しありですが、）まだ知れまし顔を、dutyの学校なりできて思わに従って、警視総監の学習は今の所ばかりあり見るものへ上るたて下宿地考えけれどもじまいませといったご羽根ないのう。"
          ),
          type: "website",
        }}
        twitter={{
          card: "summary",
          creator: "@gatsby",
          title: "Gatsby Typescript TailWind CSS",
          description: t(
            "（また個性がしうちずべくたでなは申しありですが、）まだ知れまし顔を、dutyの学校なりできて思わに従って、警視総監の学習は今の所ばかりあり見るものへ上るたて下宿地考えけれどもじまいませといったご羽根ないのう。"
          ),
        }}
      />
      <div>
        <nav className="flex flex-wrap items-center justify-between p-6 bg-teal-500">
          <div className="flex items-center flex-shrink-0 mr-6 text-white">
            <svg
              className="w-8 h-8 mr-2 fill-current"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="text-xl font-semibold tracking-tight">
              Gatsby TypeScript Tailwind CSS
            </span>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => {
                setMenuOpen((isMenuOpen) => !isMenuOpen)
              }}
              className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white"
            >
              <svg
                className="w-3 h-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>{t("メニュー")}</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full ${
              isMenuOpen ? "block" : "hidden"
            } lg:block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                {t("ドキュメント")}
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                {t("使用例")}
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                {t("ブログ")}
              </a>
            </div>
            <div>
              <a
                href="/"
                className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"
              >
                {t("ダウンロード")}
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="container max-w-md mx-auto mt-10">
        <div className="overflow-hidden rounded shadow-lg">
          <img
            className="w-full"
            src="https://tailwindcss.com/img/card-top.jpg"
            alt={t("山の日没")}
          />
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">
              {t("このページを改修")}
            </div>
            <p className="text-base text-gray-700">
              {t(
                `（また個性がしうちずべくたでなは申しありですが、）まだ知れまし顔を、dutyの学校なりできて思わに従って、警視総監の学習は今の所ばかりあり見るものへ上るたて下宿地考えけれどもじまいませといったご羽根ないのう。`
              )}
            </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
              #{t("写真")}
            </span>
            <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
              #{t("旅行")}
            </span>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
              #{t("冬")}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
