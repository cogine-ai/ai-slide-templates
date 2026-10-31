# 六套模板制作与验收记录

2026-11-01，Asia/Taipei。本批交付 **6 套、154 页**，按用户要求保持三的倍数。模板库合计 **74 套、979 页**。页数包含布局变体，不表示 154 种独立布局。本文描述完成素材整改后的版本，取代先前保留来源构图、尚待清权的实施记录。

| 模板 | 页数 | 成品 | 最终设计与结构 |
| --- | ---: | --- | --- |
| Press Kit Editorial | 24 | [template.html](../templates/press-kit-editorial/template.html) | 原创 North Objects 媒体包；轻字重、细线、事实、物品故事、资料目录与联络 |
| Interior Design Editorial | 35 | [template.html](../templates/interior-design-editorial/template.html) | 原创 Still House 提案；大地色、建筑线、材质图版、平面示意、工期与报价 |
| Fashion Editorial Lookbook | 22 | [template.html](../templates/fashion-editorial-lookbook/template.html) | 原创 Form & Fabric 编辑研究；Fogtwo No5、摄影、面料对照、服装轮廓与系列叙事 |
| Design Review Grid | 35 | [template.html](../templates/design-review-grid/template.html) | CC BY 4.0 的 Figma Community 布局改编；评审议程、设备框、反馈矩阵与决策 |
| Research Readout Pastel | 20 | [template.html](../templates/research-readout-pastel/template.html) | CC BY 4.0 的 Figma Community 布局改编；方法、发现、比例数据、机会与本地对齐演示 |
| Personal Branding Playful | 18 | [template.html](../templates/personal-branding-playful/template.html) | 原创 Ari Davis 创意实践介绍；Savate、鲜明色块、原生波纹图形、服务与合作结构 |

六套具有完整 `template.json`、`layout_slots`、`data-slot`、容量建议、来源声明与素材清单，共 **1,409 个命名填充槽位**。每套是独立 HTML，字体和照片离线内嵌；文字、表格和图形使用原生 HTML/SVG，没有把整页预览截图当作幻灯片背景。源码可编辑，不依赖原平台运行时。

## 素材整改与设计质量

四套 Pitch 参考设计未取得可用于外部模板库的独立再分发授权，因此整套改为原创构图。保留各自编辑、建筑、时尚、个人品牌的方向以及有明确许可的字体和配色气质，重新设计网格、字号层级、图文节奏、原生图形与示例文案。旧导出 DOM/CSS、源页面坐标、品牌标志、摄影与自定义插画均已移除。元数据中的历史参考只记录研究来源，不作为授权依据。旧版的源块坐标差和原版裁边例外不适用于最终版本。

两套 Figma Community 模板按 [CC BY 4.0 的官方许可依据](https://help.figma.com/hc/en-us/articles/360042296374-Figma-Community-copyright-and-licensing)保留署名改编。重建 35 / 20 张公开预览的原生布局，加入虚构 Fieldwork 产品示例。没有取得可编辑源文件，原字体身份和原始 paint 值未验证；实际采用 Design Review 的 Inter / Tinos、Research 的 DM Sans / Roboto Mono，颜色为预览匹配值。Design Review 四张未知来源照片全部替换，Research 不含图库照片。

全部摄影改为逐张核对官方页面和作者的 Pexels 图片，保留原图及内嵌文件哈希、变换、裁切和页/槽位映射。两张含印刷画稿或品牌字样的过程照在高分辨率复核后整份替换。照片只作为编辑参考，不冒称虚构工作室的客户项目、员工肖像或背书。新设计经逐页联系表、重点页面原尺寸与六套封面复核；最后修复室内提案封面标签与背景建筑线相交的问题。

Press 使用未修改的 OFL Manrope；Personal 保留原静态 Savate / Poppins，标签采用 OFL Unbounded。受限制的 Cabinet、许可说明不完整的 Hanson 均未进入最终版；Fashion 移除未使用的 Nunito Sans。各套保留独特字体，没有统一换成同一字体栈。Figma 两套补齐 HTML 内完整 OFL 文字，复制单个 HTML 也带有字体许可。

详见[来源与素材声明](template-source-notices-2026-11-01.md)和每套目录的 `SOURCE-NOTICES.md`。原创代码与图形、Figma 布局、Pexels 照片及字体分别适用 MIT、CC BY 4.0、Pexels 和实际字体许可。

## 最终验证

统一验收使用 macOS 上隔离的无头 Chrome，四套原创画布为 1920×1080，两套 Figma 画布为 1600×900，另以 1280×720 运行仓库通用视觉检查。

- **154 / 154 页运行时检查通过，6 / 6 套通用视觉检查通过**，无待豁免的裁边或内容溢出错误。逐页截图、图片解码、字体加载、离线请求、直接定位、按钮、键盘、合成触摸翻页、活动页 ARIA、重复 ID 和 SVG 引用均检查通过。
- **74 套结构验证通过，35 / 35 项工具测试通过**，含 12 项新增素材清单回归测试；验证器自身的 11 项测试另行运行通过。
- **6 套素材清单通过**，覆盖 47 个逐模板独立图片载荷记录：35 个照片记录和 12 个原创内嵌 SVG 记录。跨模板去重为 40 个载荷。其余 68 套历史模板未纳入本次素材清权，不宣称通过。
- 与旧提交 `952dce6` 的全部可渲染图片比较，包括 IMG、CSS 背景及嵌套 SVG：183 个逐模板栅格载荷/变体、26 个来源艺术资产 ID 和 15 个非简单路径指纹均无残留。183 不是照片数量。
- Research 的真实原生键盘输入、刷新恢复、九个数值与柱高同步、来源面板通过；两种数据布局在原生和缩放尺寸下的 **72 组 0 / 10 / 20 / 100 边界用例及 6 组默认用例通过**。柱高保持 7px/%；0 值为零高度。对齐演示为当前浏览器的单人本地状态，不提供 Figma 连接或多人投票。

结果、命令和最终 HTML / 元数据 / 素材清单 SHA-256 见[机器可读验收清单](template-implementation-2026-11-01.acceptance.json)。未测试 Windows/Linux、真实移动设备或其它浏览器。合成触摸只验证翻页逻辑，不等于真实触屏验收。素材校验验证记录与字节的一致性，不能证明提供方的所有权或提供无条件法律保证。

## 合并审查

审查范围为远端默认分支 `origin/main` 的 `5e0ae93020211bf8b49ead7fe1754e2510da2611` 至本批最终版本的完整分支效果，包括六套模板、说明、图库及新增校验器。逐项处理 PR #29 的素材授权、来源说明误植、不可用字体槽位和元数据可读性反馈。独立素材及设计复核未发现未解决的合并阻塞。

新增 `scripts/validate-assets.mjs` 对实际图片字节与声明逐项比对，要求清晰的作者、许可与来源，拒绝未登记替换、待定状态、缺失清单、Pexels 图片 ID 错配及远程 CSS 依赖。暂不支持 `srcset`，遇到即显式报错，避免漏检候选图片。此工具只对具有清单或被显式选择的模板执行素材记录校验。

本批采用 squash 合并，让主分支接收整改后的最终树，避免旧来源媒体提交进入主分支祖先历史；这不会抹除已经公开的 PR 历史或外部缓存。原图下载、研究快照、受限制字体研究稿和临时脚本均未纳入提交。

上游字体声明中的原始 CRLF / 尾部空白按来源保留，`git diff --check` 因而不是全绿项；实际提示数量及位置分类在验收清单记录。自编代码和元数据不沿用该例外，没有禁用钩子或检查。

## 复验与本地证据

```sh
node scripts/validate.mjs
node scripts/validate.test.mjs
node --test scripts/*.test.mjs
node scripts/validate-assets.mjs
node scripts/validate-visual.mjs --template press-kit-editorial --template interior-design-editorial --template fashion-editorial-lookbook --template design-review-grid --template research-readout-pastel --template personal-branding-playful
```

原工作区入口为 `previews/template-batch-2026-11-01/index.html`。统一运行时记录位于 `previews/implementation-2026-11-01/`，授权证据和原创设计检查位于 `previews/asset-clearance-2026-11-01/`。这些被 Git 忽略的验收产物不随新克隆提供；公开仓库保留成品、素材来源清单、验收摘要及更新后的六套封面图库。
