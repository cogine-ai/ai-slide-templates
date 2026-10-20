# 三套完整 HTML 模板制作与验证

完成日期：2026-10-20

本批新增三套，共 78 页，库从 60 套增至 63 套。每套包含独立 `template.html` 和符合现有 schema 的 `template.json`，原有模板未修改。

| 模板 | 完整页数 | 实际内嵌字体 | 来源 |
|---|---:|---|---|
| [Forest Editorial](../templates/forest-editorial/template.html) | 25 | Instrument Serif / Public Sans | [Pitch Editorial](https://pitch.com/templates/Editorial-0oEK1D3jxabA58v6tk069rBZ) |
| [Wide Design Portfolio](../templates/wide-design-portfolio/template.html) | 23 | Syne / Space Grotesk | [Hrvoje Grubišić](https://pitch.com/templates/Design-Portfolio-4mkELV2TMKDP5VhYaD4XTSx6) |
| [Sage Creative Agency](../templates/sage-creative-agency/template.html) | 30 | Tenor Sans / Open Sans | [ThisIsHome Studio](https://pitch.com/templates/Creative-Agency-Pitch-Deck-3knebz3j4rSW5RMcD23LrbVq) |

按可见原站页面重建原生 HTML 文本、SVG 图形和图表、表格、独立照片层。保留原画布坐标、字号、字重、字距、颜色和逐图裁切；没有使用整页截图替代模板。字体与图片均内嵌，单个 HTML 可离线打开。各布局提供 `data-slot` 和对应 `layout_slots`，可替换内容。

## 图片与媒体

使用内置 image_gen 生成 31 张人物或人物细节照片：Editorial 三张团队照；Creative Agency 28 张独立照片，映射到 31 个重复使用的源资产 ID。按原图逐张对齐场景、人数、服装、姿势、镜头、光线与图框裁切，生成图不是原摄影的逐像素副本。其余自然景物和静物保留公开预览中的图片。

本地原始 PNG、最终 JPEG、逐张提示词和来源映射在 Git 忽略的 `previews/research-2026-10-20/implementation/generated/`；提示词总表为 `prompts.json`。交付 HTML 内已包含最终 JPEG，不依赖该临时目录。六种字体的官方 OFL 许可正文也已内嵌在各自 HTML 中。

Editorial 第 12 页原视频在公开播放器中为不可获取的 blob，加载状态不可播放。保留该媒体框和字幕，采用已内嵌森林照片的本地缓慢平移动效，可播放、暂停，系统减少动态设置下静止。此差异已记录在元数据中。

## 验证

- 三套全部 78 页通过浏览器逐页渲染与图片加载检查，并与原页及完整总览对照
- Editorial 141 个文字框的宽高和滚动边界与原站对应值一致；原生表格和 SVG 图表已复核
- 按钮、键盘、hash 和页码导航通过；Agency 30 页缩略总览可跳转，已修复网格压缩缩略图高度的问题
- Portfolio 23 页的实际 slot 与全部 20 种布局元数据逐项匹配
- 静态离线审查无外部图片、字体、运行脚本依赖，也无残留 blob、`[MaxDepth]` 或整页截图背景
- `node scripts/validate.mjs`：63 套通过；`git diff --check`：通过

## 完整预览

本地完整预览入口为 `previews/template-batch-2026-10-20/index.html`，直接载入交付的 HTML，可切换三套、逐页浏览并打开独立演示。该入口、截图和工作材料均被 Git 忽略，仅保留在制作工作区，不随仓库提供，也不作为模板运行依赖。仓库使用者可下载并打开上表链接的各套 `template.html`，浏览完整演示。

## 第二轮原版逐页对照

用户要求再次对照后，重新打开原站并独立复核全部 78 页。重新采集浏览器计算样式、实际文本行片段与最终截图，不能只依赖第一轮通过记录。

| 模板 | 本轮覆盖与结果 |
|---|---|
| Editorial | 25 页、1,233 个设计节点、200 个非空文字节点、311 个实际行片段；内容与换行一致，文字位置最大差约 0.063 px；17 个图片框最大差约 0.016 px，254 个 SVG 节点图形属性一致 |
| Portfolio | 23 页、1,186 个节点；1,179 个布局节点最大误差约 0.007910 px；全部 live 额外字体属性、可见伪元素及素材裁切复核通过 |
| Creative Agency | 30 页、1,050 个元素、244 个文字节点；按 0.08 px 容差对照，未留有已确认的设计属性偏差；33 个图片实例和完整总览/导航通过 |

本轮修复了三套字体抗锯齿继承；补齐 Portfolio / Agency 的 calt 字体特性；补回 Portfolio 第 15 页三个珊瑚色项目符号和图片垂直对齐；限定 Editorial 四条空段落伪元素样式的作用范围；修复 Agency 73 个 SVG 的 overflow 属性。修复后各受影响页面已重新渲染、比对。

Agency 封面及第 28 页复用的人物图另外用原始高分辨率参考重新生成，改善冷绿低对比色调、人物姿态与摄影构图。选用文件为本地 `previews/research-2026-10-20/implementation/generated/agency-meadow-v2.png` / `.jpg`，已内嵌 HTML；旧版留档。最终 31 张选用 AI 素材的提示词与保存路径仍在同目录 `prompts.json`，本次精修提示词另见 `review-round-2/agency/cover-refinement.json`。

全部逐页对照图、实测数据和独立报告位于本地 `previews/research-2026-10-20/review-round-2/`。本轮结论是当前 macOS Chrome 与应用内浏览器下的高保真对照验收通过；AI 人物细节与前述第 12 页媒体替代仍是明确的素材差异，没有宣称跨浏览器逐像素一致。

## 提交前功能自审

首屏预览使用明确的 `data-preview-title` / `data-preview-subtitle` / `data-preview-kicker` 目标，避免原版复杂封面中的标签或姓名被错误替换。Portfolio 的三个独立标题框按编号分配文字，支持显式换行；其他模板保留原有预览回退。首屏裁剪后 Forest 不再绑定不存在的播放控件，选页器也只列出仍存在的页面。

三套演示的键盘导航避开按钮、链接、表单和可编辑区域，空格保留控件原生激活行为；Agency 的 Escape 仍可退出总览与填屏。应用内浏览器实际验证了这几个交互和三套单页预览，未见页面错误。新增预览回归测试覆盖目标定位、多行标题和文本转义；全部 23 项测试及 63 套模板校验通过。
