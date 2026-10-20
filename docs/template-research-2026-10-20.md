# 新一批模板候选研究

研究日期：2026-10-20（Asia/Taipei）

本批收敛为 **3 套正式候选**：Editorial、Design Portfolio、Creative Agency。第三套由 Conference Talk 调整为 ThisIsHome Studio 的 Creative Agency Pitch Deck。前两套保留；第三套重新完成了 30 页公开预览核对、整套视觉总览和实际字体检查。

## 当前候选

以下三套均实际逐页翻阅公开播放器，并检查了整套页面总览，合计 78 页。比较板采用原站幻灯片画布截图，保留原始 16:9 比例；当前大图接近截图原生尺寸，避免放大造成模糊。

| 模板 | 已核对公开预览 | 比较板代表页 | 选择依据 |
|---|---|---|---|
| [Editorial](https://pitch.com/templates/Editorial-0oEK1D3jxabA58v6tk069rBZ) | 25 / 25 | 1、4、7、18、20、21 | 大衬线、森林摄影与深浅页面形成一致语言；文字、时间线、表格、图表和指标页延续了封面质量 |
| [Design Portfolio](https://pitch.com/templates/Design-Portfolio-4mkELV2TMKDP5VhYaD4XTSx6) | 23 / 23 | 1、8、10、14、15、16 | 超宽字、黑白分节、橙黄标记和作品图版统一；案例有挑战、研究与结果，不依赖封面撑场 |
| [Creative Agency Pitch Deck](https://pitch.com/templates/Creative-Agency-Pitch-Deck-3knebz3j4rSW5RMcD23LrbVq) | 30 / 30 | 1、6、12、16、20、25、26、29 | 鼠尾草绿、深蓝、橙色圆点、轻细大写标题和胶囊照片框贯穿全套；团队、服务、证言、预算和报价页风格一致 |

这三套分别提供编辑叙事、作品案例、品牌提案三种视觉方向。第三套不再只是对照项。Conference Talk 已完成过 30 页核对，但灰绿与白字的表现相对单一，退出本批候选。

## 第三套的完整性与还原依据

来源：[ThisIsHome Studio — Creative Agency Pitch Deck](https://pitch.com/templates/Creative-Agency-Pitch-Deck-3knebz3j4rSW5RMcD23LrbVq)。公开播放器实际包含 30 页。

- 第 1–4 页：封面、品牌宣言、创始人寄语、客户简报
- 第 5–10 页：关于我们、品牌历史、摄影、共同目标、奖项、客户名单
- 第 11–14 页：团队章节与三个人物介绍
- 第 15–18 页：服务章节、服务清单、能力说明、多项服务
- 第 19–22 页：客户证言章节与三种证言布局
- 第 23–26 页：价格章节、总投入、预算明细、服务报价
- 第 27–30 页：品牌定义、两种摄影组合、联系页

实际原站 DOM 样式检查覆盖封面、第 16、25、26 页；以下字号基于原站 1920 × 1080 画布，不能直接按浏览器截图的缩小尺寸写入模板。

| 设计要素 | 实际核对结果 | HTML 还原要求 |
|---|---|---|
| 标题字体 | Tenor Sans，400；轻细无衬线大写 | 保留字形与轻细笔画，不替换为衬线或粗体标题 |
| 正文字体 | Open Sans，400 / 700 | 正文与编号、服务名、金额保持明确字重区别 |
| 封面主标题 | 150px，行高 165px，字距 -3px | 保留标题、照片与副标题之间的相对尺度 |
| 常规标题 | 75px，行高 82.5px，字距 -1.5px | 内容页保持宽松留白，不缩成普通文档标题 |
| 正文与说明 | 正文 20px；部分介绍段落 24px | 长文沿用原有栏宽与行距，超量内容拆页 |
| 核心文字色 | 深蓝 `#1F277B`；深色页标题出现鼠尾草绿 `#D4DECE` | 两个值来自实际文字样式；橙色和背景最终应从原稿逐项核对 |
| 照片形状 | 高胶囊、横向椭圆、组合圆角照片 | 按原页逐个保留比例与裁切位置，不能统一换成矩形卡片 |
| 装饰 | 橙色圆点与照片边缘错位叠放 | 逐页保留大小、位置和层级，不机械复制一套角标 |
| 页面节奏 | 深蓝章节页、浅绿内容页、整页摄影交替 | 保留整套深浅节奏，不能只挑浅色页拼装 |

比较板为第三套补了 8 张代表页，特别包括长文、预算和报价，便于判断内容变重后能否保持品质。完整 30 页可从比较板的“整套页面总览”或原站播放器查看。

## 与现有库的增量

现有 `classy-agency` 已有服务、作品、流程、团队与报价布局。第三套的新增价值有三点：

- 字体与色彩：现有模板是较粗的 Bodoni Moda 衬线与奶油 / 米灰 / 深棕；新候选采用 Tenor Sans 轻细大写、Open Sans 正文与鼠尾草绿 / 深蓝 / 橙色
- 摄影骨架：高挑胶囊、左右不对称图文、圆点穿插和三联摄影贯穿内容页；不同于现有模板的常规双栏与卡片网格
- 商业文档布局：四栏客户名单、三栏服务清单、编号工作项加总价、逐行服务报价；不同于现有模板的三张套餐卡

还原时不能只保留绿蓝配色和圆角形状，却把实景照片改成纯色占位、把 Tenor Sans 换成粗衬线、再将正文统一套进卡片；这会失去原套的摄影、细字与大留白关系。

Editorial 与已有 `editorial-luxury`、Design Portfolio 与已有 `interactive-portfolio` 也存在题材或用途接近的部分；后续入库应保留这次核对到的原始字体与构图差异，避免还原后又趋同。

## 证据边界与上一轮更正

以上为研究阶段结论。用户随后确认实施，现已完成三套共 78 页的原生 HTML 重建，详见 [制作与验证记录](template-implementation-2026-10-20.md)。公开逐页预览完整，不等于取得可编辑商业源文件；此次按可见页面重建，原有 60 套模板没有改动。

上一轮“4 套优先候选＋2 套备选”的排名已撤回。此前比较板混入网站界面、小尺寸商品拼图和局部示例，不能代表整套模板。

| 来源 | 实际公开证据 | 完整性结论 |
|---|---|---|
| [Almanac](https://studiostandard.com/products/almanac-proposal) | 商品标注 44 个 Figma 布局；7 张展示图＋4 段视频 | 未确认覆盖所有布局 |
| [Brand Naming](https://studiostandard.com/products/brand-naming-deck) | 商品标注 29 页；10 张展示图＋1 段视频 | 未确认覆盖所有页面 |
| [Meridian](https://studiostandard.com/products/meridian-pitch) | 商品标注 35 个 Figma 布局；7 张展示图＋2 段视频 | 未确认覆盖所有布局 |
| [Insight](https://stephenkelman.co.uk/insight-presentation-grid-system-for-indesign) | 23 张独立 JPG 示例页＋2 个 GIF，作者称 Sample layouts | 完整产品覆盖未确认 |
| [MetaLab Concept Testing](https://pitch.com/templates/Concept-Testing-45azrm5DbhtR5dcJty3R9Cdh) | 28 页公开播放器 | 公开预览完整，上一轮只抽查部分 |
| [Form & function](https://slides.com/official-templates/form) | 10 页公开 deck | 公开预览完整，上一轮只抽查部分 |

Studio Standard 媒体条目数依据其官方产品清单：[Almanac](https://studiostandard.com/products/almanac-proposal.js)、[Brand Naming](https://studiostandard.com/products/brand-naming-deck.js)、[Meridian](https://studiostandard.com/products/meridian-pitch.js)。媒体条目数量不等于幻灯片数量。

## 本地材料

本地三套候选比较板位于 `previews/research-2026-10-20/index.html`，提供 6–8 张代表页切换、每套完整页面总览和原站完整播放器链接。比较板、原始截图与逐页记录均被 Git 忽略，仅保留在制作工作区，不随仓库提供；逐页证据目录为 `previews/research-2026-10-20/corrected/`。可入库的三套完整 HTML 链接见[制作与验证记录](template-implementation-2026-10-20.md)。
