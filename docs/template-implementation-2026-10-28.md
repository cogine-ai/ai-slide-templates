# 六套模板完整还原与验收记录

2026-10-28，Asia/Taipei。

已按原版顺序制作并逐页对照 **6 套、110 页**：先完成 Basel、Form & function、Wonderland 的 44 页，再完成 MetaLab、Dither、Lumen 的 66 页。五套共 86 页纳入 `templates/`；Dither 的 24 页因源站明确的再分发限制，仅保留为本地研究稿。当前模板库为 **68 套、825 页**。

本记录描述实现与验收范围；公开提交的版本以 Git 历史及 PR 为准。视觉验收不代表已经逐项完成第三方照片、合成产品图和视频的权属审计。

本批来源、字体与媒体权属的具体范围见[来源与素材声明](template-source-notices-2026-10-28.md)，其中未确认的再分发授权仍为待审事项。

## 成品入口

每套入库模板均可从下表的成品链接独立打开。原工作区另有统一演示 `previews/template-batch-2026-10-28/index.html` 与典型内页对照 `previews/template-batch-2026-10-28/typical-pages.html`；这两项是本地验收产物，不随仓库克隆提供。

| 模板 | 原版全页数 | 成品 | 验收结论 |
| --- | ---: | --- | --- |
| [Basel](https://slides.com/official-templates/basel/fullscreen) | 8 | [basel-swiss-report](../templates/basel-swiss-report/template.html) | 完整顺序；原 Helvetica/Arial、配色、坐标；图表为原生 SVG。 |
| [Form & function](https://slides.com/official-templates/form/fullscreen) | 10 | [bauhaus-form-function](../templates/bauhaus-form-function/template.html) | 完整顺序；原版本 Montserrat/Open Sans、70 个原生 SVG 和独立照片。 |
| [Wonderland Concept Proposal](https://pitch.com/templates/Concept-Proposal-00fCwy2fiSrK5PCZ9W4y1H8J) | 26 | [wonderland-concept-proposal](../templates/wonderland-concept-proposal/template.html) | 包括说明和完整计划页；原 Lunchtype22、Junicode Italic、Optician Sans、原生文字与独立图片。 |
| [MetaLab Concept Testing](https://pitch.com/templates/Concept-Testing-45azrm5DbhtR5dcJty3R9Cdh) | 28 | [metalab-concept-testing](../templates/metalab-concept-testing/template.html) | 包括说明、附录、资源；原 Work Sans/Muli、三段离线原视频；六个小编号有字体替代，详见下文。 |
| [Lumen](https://slides.com/official-templates/lumen/fullscreen) | 14 | [lumen-keynote](../templates/lumen-keynote/template.html) | 原版本字体、全部暖灰层级和排版；单个装饰箭头转换为 SVG，详见下文。 |
| [Dither Gradient](https://ppt-design.com/themes/dither-gradient-retro-pixel-engineering-review-theme-668) | 24 | `outputs/restricted-template-studies/dither-engineering-review/template.html` | 根据官方逐页预览重建，保留全部页面；不纳入模板库和再分发计数。 |

每套均有单独的 `template.json`、完整 `layout_slots`、`data-slot`、容量建议和来源说明。字体、照片和视频离线内嵌；没有整页截图背景。源设计中的 App/网页截图作为独立可替换图片保留，其内部 UI 没有冒充为可编辑幻灯片文字。

## 逐页检查方法与结果

逐页检查原文、字号、字重、行高、换行、框位置、配色、形状、照片裁切及导航。先看实际来源页面，排除尚在过渡中的帧，等待字体和媒体加载，再检查最终本地浏览器渲染。来源截图存在 JPEG 色彩转换，**颜色以来源 DOM/CSS 原值为准**，没有为了匹配截图偏色而重新配色。

五套具备来源 DOM 的模板另外做了独立自动对照；下列几何差值为原生画布像素，针对文字框，不是全页像素误差：

| 模板 | 独立对照文字框 | 最大框位置/尺寸差 | 未解释的差异 | 关键检查 |
| --- | ---: | ---: | ---: | --- |
| Basel | 67 | 0 px | 0 | 8 页全部打开；源图表数据和 8 根 SVG 柱坐标匹配。 |
| Form & function | 101 | 0 px | 0 | 10 页全部打开；字体使用原站旧版本 400/700 文件，保留源字重匹配行为。 |
| Wonderland | 389 | <0.016 px | 0 | 26 页全部打开；46 个原生 SVG、37 个独立 IMG；已修复第 25 页主题填色造成的甘特条颜色差。 |
| Lumen | 66，另 1 个符号例外 | 0 px | 0 | 14 页全部打开；343 个保留源内容节点对照；发现并修复字体 fallback 导致的箭头轮廓差。 |
| MetaLab | 157 | <0.016 px | 0 | 28 页全部打开；原文字换行、29 个 IMG、51 个源 SVG、13 个原生手机框及媒体分别检查；六数字字体例外保留在原始差异报告中。 |

上述五套均未发现文字溢出、损坏图片、外部资源请求或脚本异常；键盘翻页通过。原始报告没有把有意差异删掉后伪称全等：Lumen 记录 1 个符号转换，MetaLab 记录 6 个字体差异。

Dither 只有公开的 24 张 1280×720 WebP 预览，未取得可编辑源 DOM/PPTX。24 页逐页目视对照通过，172 个文字槽、35 个原生表格单元格和可改数据 SVG 图表均经过检查。36 处像素纹理由独立原生 SVG 表达；9 个栅格层仅为单独照片。第 17 页照片上原有文字卡的 135,360 个像素已全部清为透明，再由原生文字卡覆盖，没有把原卡片文字留在图片里。全页平均绝对 RGB 差约 2.819/255，包含导航及字体/预览采样差异；此数值不等于源 DOM 精确匹配或跨浏览器像素完美。

## 明确保留的差异和来源限制

- **MetaLab 六个编号字体：**原第 20、21 页的 `01/02/03` 实际为专有 SchnyderS Cond700。遵循仓库对不可移植字体的例外，比较轮廓后使用 OFL Bodoni Moda Bold，并调整字面宽度和基线，保留原 80×42 框、28px 字号和 42px 行高。六个数字的字形仍有差异；其余 Work Sans 和封面 Muli 使用原来源字体文件。元数据明确描述实际实现。
- **Lumen 单箭头：**原字体文件不含 U+2192，本地 fallback 会变成不同的实心箭头。第 9 页只把该装饰符号转换为原生 SVG，保留框、颜色及 `aria-label`。来源/成品轮廓包围框一致，轮廓 IoU 约 99.02%；没有改全局字体栈。
- **MetaLab 视频：**三段官方原 MP4 内嵌后实际断网播放、暂停、循环及离页暂停均通过。原站第 25、26 页复查已观察到 `readyState=4` 和实际播放。第 25 页原 HLS 时长 19.783394 秒、原 MP4 19.732993 秒，约 0.0504 秒封装差异；动态图像不声明取样帧逐像素相同。
- **导航运行时：**独立 HTML 使用轻量本地导航，保留源画布结构和样式；Slides 来源页间的 Reveal 转场没有完整移植，Pitch 网站外层播放器也没有复制。没有以恢复编辑平台运行时作为完成条件。
- **Dither 再分发：**[官方许可](https://ppt-design.com/license)明确限制独立模板再分发及模板转售，并说明预览图库照片不包含在下载内。因此成品位于被 Git 忽略的 `outputs/restricted-template-studies/`，没有进入 `templates/`、README 模板清单或库计数。没有绕过登录或付费下载。
- **素材权属：**嵌入字体附带所使用字体的许可文本，保留来源署名。Wonderland 的摄影/3D 图、MetaLab 的合成 mockup 等独立素材来源有记录，但公开可访问不等于每张素材已获得独立模板再分发授权；未作这种承诺。

## 验收证据与复验

完整机器记录及最终文件 SHA-256：[验收清单](template-implementation-2026-10-28.acceptance.json)。前 44 页冻结记录：`previews/implementation-2026-10-28/phase-one-acceptance.json`。所有原始来源 DOM、逐页图片及检查脚本均在本地忽略目录 `previews/implementation-2026-10-28/`，不作为成品运行依赖；这些本地证据不会随仓库克隆提供。下表路径相对于原工作区根目录。

| 模板 | 实施与逐页记录 | 对照图入口 |
| --- | --- | --- |
| Basel | `previews/implementation-2026-10-28/basel/implementation-notes.md` | `previews/implementation-2026-10-28/basel/source-vs-template-overview.png` |
| Form & function | `previews/implementation-2026-10-28/form/implementation-notes.md` | `previews/implementation-2026-10-28/form/comparison-01.jpg` |
| Wonderland | `previews/implementation-2026-10-28/wonderland/notes.md` | `previews/implementation-2026-10-28/wonderland/` |
| MetaLab | `previews/implementation-2026-10-28/metalab/notes.md` | `previews/implementation-2026-10-28/metalab/compare-01-04.jpg`、`previews/implementation-2026-10-28/metalab/compare-25-28.jpg` |
| Lumen | `previews/implementation-2026-10-28/lumen/implementation-notes.md` | `previews/implementation-2026-10-28/lumen/source-vs-template-01-07.png`、`previews/implementation-2026-10-28/lumen/source-vs-template-08-14.png` |
| Dither | `previews/implementation-2026-10-28/dither/notes.md` | `previews/implementation-2026-10-28/dither/compare-01-04.png` |

仓库结构验证 `node scripts/validate.mjs` 通过 68 套；本批各模板的视觉/导航验证通过。既有工具测试 23/23 通过；未修改验证逻辑或测试代码。没有做真实 Windows/Linux、移动设备及其它浏览器的显示验收。

可在新克隆中运行以下检查复验，无需上述本地证据目录：

```sh
node scripts/validate.mjs
node --test scripts/*.test.mjs
node scripts/validate-visual.mjs --template basel-swiss-report --template bauhaus-form-function --template wonderland-concept-proposal --template metalab-concept-testing --template lumen-keynote
```

## 提交前自审修复

本轮审查以 `origin/main` 的 `cd114b0` 为基线：

- 修正 MetaLab 第 20、21、24 页的 7 个旧 CSS `clip-path` 引用，使其指向已命名空间化的 SVG 定义；对照原来源绑定并复核 107 个受影响 SVG 节点。修后截图另存于本地 `metalab/clip-path-fix/`，原 CUA 图保留为修前记录。
- 修正 Form 从 Escape 总览模式进入打印时遗留的缩放、偏移和选中描边。普通模式和总览模式均实际生成 10 页 PDF，每页 1280×720；屏幕排版不变。
- 移除公开文档中指向 Git 忽略目录及固定 localhost 的可点击链接，保留可随仓库获取的成品和验收清单入口。

修后再次通过受影响两套模板的视觉/导航验证，Form 101 框文字、MetaLab 157 框文字独立对照通过；MetaLab 仍保留已明确记录的六处字体替代。最终 SHA 及本轮新验证结果以随仓库提供的验收清单为准。来源设计与媒体再分发授权未全部确认，已在来源与素材声明中列为待审风险；Dither 仍不随提交提供。
