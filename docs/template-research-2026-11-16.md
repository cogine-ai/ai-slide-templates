# 新一批高质量模板候选研究

研究开始于 2026-11-16，完成于 2026-11-17，Asia/Taipei。现库基线为 **81 套、1,183 页示例**。本轮完成来源研究和候选筛选，尚未新增模板、购买商品或公开发布素材。

## 推荐结果

建议选择下列 **6 套**。排序是针对现有库的设计判断，综合视觉系统、代表内页质量、实际内容承载力、相对现库的增量及 HTML 实现条件，不是全球模板质量排名。

| 顺位 | 来源 / 作者 | 源页数 | 主要价值 | 主要取舍 |
|---|---|---:|---|---|
| 1 | [Lattice — Pitch](https://pitch.com/templates/Lattice-4jQ5L12f5VsJ5JjeBw5sxHry) | 27 | 深蓝黑、荧黄线框、细网格和克制的大字；图表、表格、定价、里程碑延续统一视觉 | 正文和图表标签偏小，中文需要控制字数；不宜塞入密集架构说明 |
| 2 | [Billiard — Hrvoje Grubišić](https://pitch.com/templates/Billiard-3onEqv5he6K55A9T7u74qpge) | 29 | 灰底砖红、黑白纪实摄影、无衬线标题与衬线正文；像一本连续的文化编辑刊物 | 摄影依赖高、长正文页较密；适合叙事而非财务报表 |
| 3 | [Brand Style Guide — Andrea Jelić](https://pitch.com/templates/Brand-Style-Guide-2CaJH86SuWEu5gg8yq6z6ELY) | 19 | 粉绿黑白、大衬线与竖排栏目；字体标本、色阶、Logo 配色、摄影原则和网格规范 | 适用面较专门；源字体标签和实际字族需区分，不能按页面示例标签选字体 |
| 4 | [Case Study — Bakken & Bæck](https://pitch.com/templates/Case-Study-31PWcR3e1HHc58MQFo47nLcu) | 46 | 背景→Brief→范围→过程→概念角度→结果，完整案例的组织能力最好 | 多页是同族图片或章节变体；源示例的尺寸文字与嵌入画面需替换 |
| 5 | [Lumenfield — Slides 官方](https://slides.com/official-templates/lumenfield) | 14 | 凝缩大字、紫粉薄荷绿、夜色几何；路线示意、节目表、艺术家、访客须知、合作伙伴 | 适合文化活动和发布会；源图形是示意，不应宣传为真实地理地图或真实艺术作品 |
| 6 | [Plotwise — Slides 官方](https://slides.com/official-templates/plotwise) | 16 | 奶油底、森林绿、金黄和陶土色；圆角图形贯穿问题、产品、商业模式、市场与融资 | 与现库暖色方向有邻近；入选价值在完整融资叙事，市场圆形是概念图，不是按金额面积编码的统计图 |

六套合计 **151 页来源页面**，包括章节页及同族变体，不等于 151 种独立布局。如果先推进较小批次，建议先做前三套；完整六套入库后总数应为 87 套。

## 检查方法与证据范围

- 程序读取当前 81 份 `template.json`，比较来源、字族、色彩、布局、密度和用途；回看 10 月 20 日、28 日、31 日和 11 月 7 日研究及实施记录，排除已入库来源，并检查此前候选的暂缓原因。
- 新鲜获取 Pitch 官方公开目录：**153 条记录、136 个不同 canonical slug**。这个数是入口去重结果，不等于 136 套独立设计：部分作者版本与通用版本共用 canonical；部分同名模板又有不同入口。
- 从目录中筛看 **29 套官方展示图**，对其中 7 套打开官方播放器检查代表内页：Lattice、Billiard、Case Study、Brand Style Guide、Wave、AI-Native Pitch Deck、SaaS Investor Update。展示图只承担初筛，不作为整套质量的证明。
- 新发现 Slides 官方的 Halden、Lumenfield、Plotwise、Sorbet，读取完整公开页结构并打开官方演示。Halden 的部分截图被页面导航裁切，仅作降级比较；Lumenfield、Plotwise 和 Sorbet 另用独立 fullscreen 画布检查代表页。Code 查看了封面和公开页面结构，未完成代码内页视觉检查。
- 交叉查看 Mel Choyce 的 Retro Vibes 作者文章、Studio Standard 的 Atlas 与 Lorile 官方产品说明；实际查看 Atlas 3 张官方商品图，其中含内容页拼图。没有将商品拼图视为逐页源稿。

本轮**没有宣称任何候选已经完成全套逐页视觉验收**。Pitch 的结构来自官方公开数据，视觉判断来自下表列明的官方播放器页面；媒体解码、断网效果、全部字体、视频、触屏和跨浏览器均未作成品验收。浏览器导航遇到菜单遮挡的早期画面未作为结论依据，Case Study 随后重新检查无遮挡版本。

| 候选 | 实际用于判断的代表页 |
|---|---|
| Lattice | 5、9、12、20、22、26；另查看官方封面展示图 |
| Billiard | 2、6、11、17、23、27；另查看官方封面展示图。11 页的视频画面未验证播放 |
| Brand Style Guide | 3、6、8、12、14、17；作者播放器确认为 19 页 |
| Case Study | 1、8、16、22、29、39、43；作者播放器确认为 46 页 |
| Lumenfield | 1、2、3、5、6、8、9、12、13；独立 fullscreen 画布 |
| Plotwise | 1、5、6、7、12、15；独立 fullscreen 画布。快速切换时的 3、10 页截图有过渡裁切，不用于边界或排版结论 |
| AI-Native Pitch Deck | 6、14、22、26、29、37 |
| Wave | 4、9、15、17、18、19 |
| SaaS Investor Update | 15、16、17、19；先前截图批次未成功返回，不作为额外视觉覆盖 |
| Sorbet | 1、2、6、8、10；10 页快速切换截图存在裁切，不据此判断整页边界 |

本地[来源展示图比较板](../previews/research-2026-11-16/index.html)包含六套主选、三套备选、代表页编号、推荐理由和原始链接。图像是官方展示图，不是本仓库的新成品预览。目录缓存、源 HTML、盘点和图像保留在 Git 忽略目录 `previews/research-2026-11-16/`；该链接依赖当前工作区，公开克隆不包含这些研究素材。本研究文档中的官方来源链接可独立使用。

## 六套的具体增量

### 1. Lattice：让技术表达更克制

现有 `circuit-tech-dark` 偏终端、系统图和高密度控制台；`dark-minimal-ui` 偏界面演示；Lattice 用轻细分区线、黄色节点和线框几何组织普通业务信息。第 9 页清单、第 12 页定价、第 20 页面积图、第 22 页表格和第 26 页里程碑，都保留同一套细网格关系，适合数据平台、技术产品和研究型发布。

官方数据中的字族包括 Roboto、Roboto Mono，部分图表样式声明 Carlito。细线对比度和小标签是源设计特征，制作时应逐页检查中文容量，不能以缩小字体解决超量文本。

### 2. Billiard：更明确的纪实编辑语言

相对 `forest-editorial` 的森林色与大衬线、`indie-publishing-editorial` 的彩纸网格，Billiard 以灰色、砖红和黑白照片建立更冷静的文化杂志感。第 17 页的两幅不等大照片与小正文、第 23 页的人物和角色说明、第 27 页的三行论点说明，能支撑真实专题内容。

源数据使用 Gelasio 与 Open Sauce Sans。官网展示图包含多页合成，实际封面是灰底砖红标题；制作要按真实单页还原。源长文为布局示例，实施应更换成一致的可信叙事。视频框保留为独立媒体槽位，不默认离线可播。

### 3. Brand Style Guide：把品牌规范本身做成内容

相对 `identity-brand-guidelines` 的传统 VI 结构和 `brand-voice-guidelines` 的语言规范，本套补充更细腻的字体标本、色阶、Logo 多色组合、摄影规则与网格示范。第 3 页竖排目录、第 8 页色阶、第 12 页四象限 Logo 和第 17 页网格，均有实际复用价值。

必须使用 Andrea Jelić 的 19 页版本。通用 `Brand-Guidelines-7TsUZF24p3Lp54xk454zZ5Ve` 打开是 Pitch 的 29 页版本，两者不是一套。作者版源数据声明 Agate / Nimbus Sans L；页面字体标本中的 “New York”等示例标签不等于实际嵌入字体名称。制作时核对实际字体文件与可用替代方案，并如实写入元数据。

### 4. Case Study：复杂项目如何讲清楚

`outcome-case-study` 当前是 9 页的结果故事；本套能容纳完整服务交付：Brief、范围、交付物、时间线、多个概念角度、影响指标、技术栈、认可和客户引语。第 16 页提供按月的日历式过程，第 29 页用大图与局部细节解释设计，第 39 页把结果提炼为指标。

目录里的作者记录为 46 页，但 canonical 指向一个 31 页的通用 Case Study。已通过官方作者版实际链接确认 46 页范围及作者。实施应固定模板 ID `4e816fca-6734-4493-a172-4ea679f0aa16`。源数据声明 Standard / Fira Code；实际字体文件、嵌入网页演示和所有图像要在制作时逐项处理，不能用整页截图替代可改内容。

### 5. Lumenfield：补足活动导览和现场信息

`neon-night-pitch` 和 `newsroom-broadcast` 能表达活动气氛，但没有这套连续的路线→作品→节目→访客→伙伴组织。路线页、节目表和入场/交通信息是主要增量。紫色圆形、粉色菱形、薄荷绿线路和凝缩标题构成完整身份，低摄影依赖也适合原生 HTML/SVG。

公开源使用 League 字体主题；精确字族、字重和文件版本应在实施时从实际样式核对。场地路线是抽象导览示意，艺术家头像和装置画面含几何占位，实际活动内容必须替换。它也适用于展览、社区节庆和产品体验日，不按灯光节行业锁死。

### 6. Plotwise：温暖的完整融资故事

`earthy-handmade` 更偏社区和工作坊，`sustainability-report` 更偏运营报告，`finance-startup-statements` 偏财务说明。Plotwise 把暖色和圆角模块用于从问题到产品、牵引力、市场、商业模式、路线图和融资用途的完整顺序，适合社区产品、消费服务、气候和生活方式创业项目。

研究阶段按主题名记为 Merriweather；[制作核验](template-implementation-2026-11-17.md)确认实际字族为 Merriweather Sans / Oxygen，已保留原静态字体。融资用途的分段条需要保留可改数值与同步几何；市场圆形只作层级关系示意。源模板的调查、团队、融资和业务数字均为演示内容，不作为真实项目或真实调研证据。

## 三套备选

| 备选 | 已检查的证据 | 本轮取舍 |
|---|---|---|
| [AI-Native Pitch Deck — Pitch](https://pitch.com/templates/AI-Native-Pitch-Deck-3Stf194ZKoz54Z8eaa2NgwYv) | 40 页公开结构，6 页播放器视觉 | 融资覆盖全面，紫色渐变与 Manrope / Space Mono 很完整；但所看正文仍以通用融资结构为主，未发现足够 AI 专属结构。第 37 页列表比例为 20/45/35，圆图标签却为 20/35/50，实施需修正源示例数据一致性 |
| [Wave — Pitch](https://pitch.com/templates/Wave-4wbXaj2Gs2F25jiQWL2tzfwM) | 24 页公开结构，6 页播放器视觉 | 浅绿波纹、半色调和等宽正文很舒服；表格、时间线和柱图俱全，但相对现有暖色/研究/半色调方向增量较小。若用户更要浅色技术风，可优先替换 Plotwise |
| [Atlas Studio Deck — Natalia Karczewska](https://studiostandard.com/products/atlas-studio-deck) | 官方声明 26 页，实际查看 3 张商品图，包含内容页拼图 | 文化与摄影工作室的作品、观点和合作过程有很高设计潜力；官方列 EB Garamond / Inter / Courier Prime，并说明示例摄影不随文件提供。未取得 26 页完整源稿，保留为有条件的高端研究候选 |

若继续扩为九套，保留这六套主选，再完成三套备选的缺失核查；Atlas 如不能进入公开模板库，需要补足适当替代，不能把本地研究图计入数量。

## 其他取舍

- **SaaS Investor Update / ChartMogul**：第 15–19 页的 MRR 拆解、流失和现金说明有实用价值，但所看画面更接近传统蓝白报表，细灰文字较弱；可另做指标专题，未列本批视觉首选。HTML 不应声称保留 ChartMogul 平台集成。
- **Halden**：几何形、奶油/深蓝/砖红与流程甘特清楚，然而与现有 Bauhaus、Basel 和空间提案方向接近。部分页检查受主站导航裁边影响，未将这些画面当成完整视觉证据。
- **Sorbet**：第一周安排、开店清单、产品卡和日程实用，但圆角彩卡与既有 HR/培训模板较近；本批不靠同族卡片结构补数量。
- **Code**：代码呈现、公式和嵌入演示值得专题研究；本轮仅有结构与封面证据，不列主选。
- **Retro Vibes / Mel Choyce**：重新核对了[作者文章](https://melchoyce.design/2025/06/20/free-figma-resource-retro-vibes-slide-template/)，确认作者选用 Instrument Serif / Instrument Sans 及 Pexels 图片。仍未补齐整套来源结构，不重复提升为已具备全套证据的主选。
- **Lorile / Studio Standard**：官方声明 40 页，品牌策略、定位尺度与下一步结构有价值；本轮未完成实际商品图视觉检查，不作设计排名。其[官方说明](https://studiostandard.com/products/lorile-brand-strategy)列出 Helvetica Neue / Helvetica Now Display，并明确字体及摄影不包含在下载中。

## 制作前需要固定的事项

用户若选择这批，下一阶段逐套固定真实作者版、源页序、字体、布局和命名槽位，完成全部页面的视觉映射，然后原生重建文字、形状、表格和图表。保留每套各自的字体与配色；新内容超量则拆页。

研究推荐不等于公开再分发权利已核清。Pitch、Slides 和商业商品页的字体、媒体及源设计按实际来源分别登记，不把仓库 MIT 延伸为第三方素材许可，也不把未找到积极许可自动当成所有研究或设计候选的停止条件。Atlas 是商品源稿，完整文件取得、来源用途和替换摄影需具体处理；本轮没有购买或联系作者。

本轮仅新增研究文档；没有修改模板、预览工具或验证逻辑。已运行 `node scripts/validate.mjs`，81 套模板结构和元数据校验通过。
