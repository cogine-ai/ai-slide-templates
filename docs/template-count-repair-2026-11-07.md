# 模板数量修复与历史补位

2026-11-07，Asia/Taipei。当前修复分支包含 **81套、1,183页**，在原80套基础上新增一套完整的18页 Trend Report。没有删除、重复计数或修改原80套模板，也没有把本地研究稿计入数量。

## 缺口与修复范围

Git 主线树的实际增量为：

| 检查点 | 实际新增 | 总数 |
|---|---:|---:|
| PR #27 | 3 | 63 |
| PR #28（2026-10-28） | 5 | 68 |
| PR #29 | 6 | 74 |
| PR #30 | 6 | 80 |
| 本次历史补位 | 1 | 81 |

[10月28日的记录](template-implementation-2026-10-28.md)明确记载：原选六套中的 Dither Gradient 因来源明确的再分发限制仅作本地研究，五套进入 `templates/`。当时没有补上替代候选，后续每次增加六套也就一直保留了这个缺口。本次新增一套完成该历史批次的第六个入库名额；不改写 PR #28 实际新增五套的历史事实，不把本次视为单独的一套新批次。

## 三候选复核与选择

继续比较此前研究的三个备选，保留此前六套已接受成品：

| 候选 | 本次判断 |
|---|---|
| [Retro Vibes — Mel Choyce](https://melchoyce.design/2025/06/20/free-figma-resource-retro-vibes-slide-template/) | 作者页面展示 Instrument Serif / Sans 与暖色摄影，质量好；但尚未取得全部版式的完整可编辑结构，不用七张图片冒称完整模板 |
| [Lucid — Acreb Studio](https://pitch.com/templates/Lucid-3SM59m4ud7C954Vdd20mhsUx) | 29页超现实3D与宽体字有鲜明个性；与既有 maximalist 提案方向较近，Hanson 原字体还需替代或补许可依据 |
| [Trend Report — Pitch](https://pitch.com/templates/Trend-Report-2XJYhd7GqKsa4edCjP5HiXFx) | 选用。已看完18页，覆盖摘要、目录、章节、图文、引语、横向柱图、环图、分组比较、影响、原生数据单元格、建议、方法与结束页；可保留其原开放字体家族 |

这是设计/布局适配判断，不是全球模板质量排名或第三方素材全面清权声明。选择 Trend Report 是为补足证据→比较→影响→建议的报告结构，非仅补一个封面。

## 完整成品

[chrome-trend-report/template.html](../templates/chrome-trend-report/template.html)：18页，221个填充槽位。Poppins Black 大写标题、Poppins 正文、Inter 图表字、紫色渐变、曲面网格、镀铬图形和各页构图保留；来源声明的 Abril Fatface 主题字体也内嵌可用。没有用整页截图代替幻灯片，也没有移入 Pitch 应用运行时。

四张图表独立重建为原生 SVG，附 JSON 数据；表格布局为原生可编辑文字与形状单元格。示例为虚构 Signals Studio 研究，数据仅作布局演示，百分比图使用合计100%的示例值，不声称实际调研结果。背景图片按源模板的幻灯片级背景语义处理，矩形圆角与渐变独立保留；第5页画布外的页眉按来源裁边保留为原生 SVG 文字。

原始34条图片资源已下载并记录原始/内嵌字节哈希、来源URL、页码和转换；位图为高质量 WebP，最长边不超过2560像素。字体来自官方上游，保持文件字节未修改，附各家族 OFL 全文。源设计/3D艺术/摄影不因仓库 MIT 自动改为 MIT；未追溯的媒体作者与许可字段保留未确定状态，不伪造清权清单。见模板内 `SOURCE-NOTICES.md` 和 `ASSET-LICENSES/source-register.json`。

## 数量保障

`AGENTS.md` 现在同时要求候选批次和实际入库总数为三的倍数；被排除候选需补足后才能结束批次，历史批次允许补其缺失名额。

`scripts/validate.mjs` 直接统计实际读取到 `template.json` 与 `template.html` 的模板并执行总数整除检查，不依赖 README 或手写索引。已有的文件、结构及元数据错误仍然使验证失败。一个没有实际文件的空文件夹不能充作第81套。

回归测试覆盖2→3→4的实际数量变化，以及80套失败、添加空文件夹仍失败、补齐真实第81套后通过的场景。原有有效性测试改为真实的三模板测试库，没有给生产校验增加跳过数量检查的开关。

## 验收

- 修改前的真实80套库被新数量检查明确拒绝；补齐后的81套结构/元数据通过。
- `node scripts/validate.test.mjs`：13项通过；`node --test scripts/*.test.mjs`：46项通过，含新增数量和新封面预览回归。
- `node scripts/validate-visual.mjs --template chrome-trend-report`：18页浏览器视觉和导航检查通过。
- 新模板逐页断网解码、控制台、画布边界与常规未旋转文字框排版高度检查通过；按钮、方向键、Space、Home/End、页码、URL、合成触摸、390×844缩放及所有声明字体解码通过。
- 自定义标题/副标题的单页预览通过；无可见 kicker 槽位时按明确映射省略，不改写镀铬装饰。
- `node scripts/validate-assets.mjs`：既有6份清权清单通过，其余75套未纳入该清权校验；本模板使用来源登记，未声称通过全面清权。

原80套模板文件保持不变。没有运行其他浏览器、Windows/Linux或真实触屏验收。逐页源图与成品截图、三候选研究、失败/成功检查记录保存在忽略目录 `previews/count-repair-2026-11-07/`；[公开验收摘要](template-count-repair-2026-11-07.acceptance.json)保留文件哈希和结果。
