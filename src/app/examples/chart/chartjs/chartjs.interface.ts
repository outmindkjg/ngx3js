export type DeepPartial<T> = T extends Function
	? T
	: T extends Array<infer U>
	? _DeepPartialArray<U>
	: T extends object
	? _DeepPartialObject<T>
	: T | undefined;

type _DeepPartialArray<T> = Array<DeepPartial<T>>;
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type DistributiveArray<T> = [T] extends [unknown] ? Array<T> : never;

// https://stackoverflow.com/a/50375286
export type UnionToIntersection<U> = (
	U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never;

export type TimeUnit =
	| 'millisecond'
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'week'
	| 'month'
	| 'quarter'
	| 'year';

export interface DateAdapter {
	// Override one or multiple of the methods to adjust to the logic of the current date library.
	override(members: Partial<DateAdapter>): void;
	readonly options: unknown;

	/**
	 * Returns a map of time formats for the supported formatting units defined
	 * in Unit as well as 'datetime' representing a detailed date/time string.
	 * @returns {{string: string}}
	 */
	formats(): { [key: string]: string };
	/**
	 * Parses the given `value` and return the associated timestamp.
	 * @param {unknown} value - the value to parse (usually comes from the data)
	 * @param {string} [format] - the expected data format
	 */
	parse(value: unknown, format?: TimeUnit): number | null;
	/**
	 * Returns the formatted date in the specified `format` for a given `timestamp`.
	 * @param {number} timestamp - the timestamp to format
	 * @param {string} format - the date/time token
	 * @return {string}
	 */
	format(timestamp: number, format: TimeUnit): string;
	/**
	 * Adds the specified `amount` of `unit` to the given `timestamp`.
	 * @param {number} timestamp - the input timestamp
	 * @param {number} amount - the amount to add
	 * @param {Unit} unit - the unit as string
	 * @return {number}
	 */
	add(timestamp: number, amount: number, unit: TimeUnit): number;
	/**
	 * Returns the number of `unit` between the given timestamps.
	 * @param {number} a - the input timestamp (reference)
	 * @param {number} b - the timestamp to subtract
	 * @param {Unit} unit - the unit as string
	 * @return {number}
	 */
	diff(a: number, b: number, unit: TimeUnit): number;
	/**
	 * Returns start of `unit` for the given `timestamp`.
	 * @param {number} timestamp - the input timestamp
	 * @param {Unit|'isoWeek'} unit - the unit as string
	 * @param {number} [weekday] - the ISO day of the week with 1 being Monday
	 * and 7 being Sunday (only needed if param *unit* is `isoWeek`).
	 * @return {number}
	 */
	startOf(
		timestamp: number,
		unit: TimeUnit | 'isoWeek',
		weekday?: number
	): number;
	/**
	 * Returns end of `unit` for the given `timestamp`.
	 * @param {number} timestamp - the input timestamp
	 * @param {Unit|'isoWeek'} unit - the unit as string
	 * @return {number}
	 */
	endOf(timestamp: number, unit: TimeUnit | 'isoWeek'): number;
}

export interface Animation {
	new (cfg: AnyObject, target: AnyObject, prop: string, to?: unknown);
	active(): boolean;
	update(cfg: AnyObject, to: unknown, date: number): void;
	cancel(): void;
	tick(date: number): void;
}

export interface AnimationEvent {
	chart: Chart;
	numSteps: number;
	initial: boolean;
	currentStep: number;
}

export interface Animator {
	listen(
		chart: Chart,
		event: 'complete' | 'progress',
		cb: (event: AnimationEvent) => void
	): void;
	add(chart: Chart, items: readonly Animation[]): void;
	has(chart: Chart): boolean;
	start(chart: Chart): void;
	running(chart: Chart): boolean;
	stop(chart: Chart): void;
	remove(chart: Chart): boolean;
}

export interface Animations {
	new (chart: Chart, animations: AnyObject);
	configure(animations: AnyObject): void;
	update(target: AnyObject, values: AnyObject): undefined | boolean;
}

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<string, never>;
export type Color = string | CanvasGradient | CanvasPattern;

export interface Element<T = AnyObject, O = AnyObject> {
	readonly x: number;
	readonly y: number;
	readonly active: boolean;
	readonly options: O;

	tooltipPosition(useFinalPosition?: boolean): Point;
	hasValue(): boolean;
	getProps<P extends (keyof T)[]>(
		props: P,
		final?: boolean
	): Pick<T, P[number]>;
}
export interface Element {
	new <T = AnyObject, O = AnyObject>(): Element<T, O>;
}

export interface ChartArea {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

export interface Point {
	x: number;
	y: number;
}

export type TRBL = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type TRBLCorners = {
	topLeft: number;
	topRight: number;
	bottomLeft: number;
	bottomRight: number;
};

export type CornerRadius = number | Partial<TRBLCorners>;

export type RoundedRect = {
	x: number;
	y: number;
	w: number;
	h: number;
	radius?: CornerRadius;
};

export type LayoutPosition =
	| 'left'
	| 'top'
	| 'right'
	| 'bottom'
	| 'center'
	| 'chartArea'
	| { [scaleId: string]: number };

export interface LayoutItem {
	/**
	 * The position of the item in the chart layout. Possible values are
	 */
	position: LayoutPosition;
	/**
	 * The weight used to sort the item. Higher weights are further away from the chart area
	 */
	weight: number;
	/**
	 * if true, and the item is horizontal, then push vertical boxes down
	 */
	fullSize: boolean;
	/**
	 * Width of item. Must be valid after update()
	 */
	width: number;
	/**
	 * Height of item. Must be valid after update()
	 */
	height: number;
	/**
	 * Left edge of the item. Set by layout system and cannot be used in update
	 */
	left: number;
	/**
	 * Top edge of the item. Set by layout system and cannot be used in update
	 */
	top: number;
	/**
	 * Right edge of the item. Set by layout system and cannot be used in update
	 */
	right: number;
	/**
	 * Bottom edge of the item. Set by layout system and cannot be used in update
	 */
	bottom: number;

	/**
	 * Called before the layout process starts
	 */
	beforeLayout?(): void;
	/**
	 * Draws the element
	 */
	draw(chartArea: ChartArea): void;
	/**
	 * Returns an object with padding on the edges
	 */
	getPadding?(): ChartArea;
	/**
	 * returns true if the layout item is horizontal (ie. top or bottom)
	 */
	isHorizontal(): boolean;
	/**
	 * Takes two parameters: width and height.
	 * @param width
	 * @param height
	 */
	update(width: number, height: number, margins?: ChartArea): void;
}

export interface ScriptableContext<TType extends ChartType> {
	active: boolean;
	chart: Chart;
	dataIndex: number;
	dataset: UnionToIntersection<ChartDataset<TType>>;
	datasetIndex: number;
	parsed: UnionToIntersection<ParsedDataType<TType>>;
	raw: unknown;
}

export interface ScriptableLineSegmentContext {
	type: 'segment';
	p0: PointElement;
	p1: PointElement;
	p0DataIndex: number;
	p1DataIndex: number;
	datasetIndex: number;
}

export type Scriptable<T, TContext> =
	| T
	| ((ctx: TContext, options: AnyObject) => T | undefined);
export type ScriptableOptions<T, TContext> = {
	[P in keyof T]: Scriptable<T[P], TContext>;
};
export type ScriptableAndArray<T, TContext> =
	| readonly T[]
	| Scriptable<T, TContext>;
export type ScriptableAndArrayOptions<T, TContext> = {
	[P in keyof T]: ScriptableAndArray<T[P], TContext>;
};

export interface ParsingOptions {
	/**
	 * How to parse the dataset. The parsing can be disabled by specifying parsing: false at chart options or dataset. If parsing is disabled, data must be sorted and in the formats the associated chart type and scales use internally.
	 */
	parsing:
		| {
				[key: string]: string;
		  }
		| false;

	/**
	 * Chart.js is fastest if you provide data with indices that are unique, sorted, and consistent across datasets and provide the normalized: true option to let Chart.js know that you have done so.
	 */
	normalized: boolean;
}

export interface ControllerDatasetOptions extends ParsingOptions {
	/**
	 * The base axis of the chart. 'x' for vertical charts and 'y' for horizontal charts.
	 * @default 'x'
	 */
	indexAxis: 'x' | 'y';
	/**
	 * How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. 0 = clip at chartArea. Clipping can also be configured per side: clip: {left: 5, top: false, right: -2, bottom: 0}
	 */
	clip: number | ChartArea;
	/**
	 * The label for the dataset which appears in the legend and tooltips.
	 */
	label: string;
	/**
	 * The drawing order of dataset. Also affects order for stacking, tooltip and legend.
	 */
	order: number;

	/**
	 * The ID of the group to which this dataset belongs to (when stacked, each group will be a separate stack).
	 */
	stack: string;
	/**
	 * Configures the visibility state of the dataset. Set it to true, to hide the dataset from the chart.
	 * @default false
	 */
	hidden: boolean;
}

export interface BarControllerDatasetOptions
	extends ControllerDatasetOptions,
		ScriptableAndArrayOptions<BarOptions, ScriptableContext<'bar'>>,
		ScriptableAndArrayOptions<CommonHoverOptions, ScriptableContext<'bar'>>,
		AnimationOptions<'bar'> {
	/**
	 * The ID of the x axis to plot this dataset on.
	 */
	xAxisID: string;
	/**
	 * The ID of the y axis to plot this dataset on.
	 */
	yAxisID: string;

	/**
	 * Percent (0-1) of the available width each bar should be within the category width. 1.0 will take the whole category width and put the bars right next to each other.
	 * @default 0.9
	 */
	barPercentage: number;
	/**
	 * Percent (0-1) of the available width each category should be within the sample width.
	 * @default 0.8
	 */
	categoryPercentage: number;

	/**
	 * Manually set width of each bar in pixels. If set to 'flex', it computes "optimal" sample widths that globally arrange bars side by side. If not set (default), bars are equally sized based on the smallest interval.
	 */
	barThickness: number | 'flex';

	/**
	 * Set this to ensure that bars are not sized thicker than this.
	 */
	maxBarThickness: number;

	/**
	 * Set this to ensure that bars have a minimum length in pixels.
	 */
	minBarLength: number;

	/**
	 * Point style for the legend
	 * @default 'circle;
	 */
	pointStyle: PointStyle;
}

export interface BarControllerChartOptions {
	/**
	 * Should null or undefined values be omitted from drawing
	 */
	skipNull?: boolean;
}

export interface BarController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): BarController;
}

export interface BubbleControllerDatasetOptions
	extends ControllerDatasetOptions,
		ScriptableAndArrayOptions<PointOptions, ScriptableContext<'bubble'>>,
		ScriptableAndArrayOptions<PointHoverOptions, ScriptableContext<'bubble'>> {}

export interface BubbleDataPoint {
	/**
	 * X Value
	 */
	x: number;

	/**
	 * Y Value
	 */
	y: number;

	/**
	 * Bubble radius in pixels (not scaled).
	 */
	r: number;
}

export interface BubbleController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): BubbleController;
}

export interface LineControllerDatasetOptions
	extends ControllerDatasetOptions,
		ScriptableAndArrayOptions<PointPrefixedOptions, ScriptableContext<'line'>>,
		ScriptableAndArrayOptions<
			PointPrefixedHoverOptions,
			ScriptableContext<'line'>
		>,
		ScriptableOptions<LineOptions, ScriptableContext<'line'>>,
		ScriptableOptions<LineHoverOptions, ScriptableContext<'line'>>,
		AnimationOptions<'line'> {
	/**
	 * The ID of the x axis to plot this dataset on.
	 */
	xAxisID: string;
	/**
	 * The ID of the y axis to plot this dataset on.
	 */
	yAxisID: string;

	/**
	 * If true, lines will be drawn between points with no or null data. If false, points with NaN data will create a break in the line. Can also be a number specifying the maximum gap length to span. The unit of the value depends on the scale used.
	 * @default false
	 */
	spanGaps: boolean | number;

	showLine: boolean;
}

export interface LineControllerChartOptions {
	/**
	 * If true, lines will be drawn between points with no or null data. If false, points with NaN data will create a break in the line. Can also be a number specifying the maximum gap length to span. The unit of the value depends on the scale used.
	 * @default false
	 */
	spanGaps: boolean | number;
	/**
	 * If false, the lines between points are not drawn.
	 * @default true
	 */
	showLine: boolean;
}

export interface LineController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): LineController;
}

export type ScatterControllerDatasetOptions = LineControllerDatasetOptions;

export interface ScatterDataPoint {
	x: number;
	y: number;
}

export type ScatterControllerChartOptions = LineControllerChartOptions;

export interface ScatterController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): ScatterController;
}

export interface DoughnutControllerDatasetOptions
	extends ControllerDatasetOptions,
		ScriptableAndArrayOptions<ArcOptions, ScriptableContext<'doughnut'>>,
		ScriptableAndArrayOptions<ArcHoverOptions, ScriptableContext<'doughnut'>>,
		AnimationOptions<'doughnut'> {
	/**
	 * Sweep to allow arcs to cover.
	 * @default 360
	 */
	circumference: number;

	/**
	 * Arc offset (in pixels).
	 */
	offset: number;

	/**
	 * Starting angle to draw this dataset from.
	 * @default 0
	 */
	rotation: number;

	/**
	 * The relative thickness of the dataset. Providing a value for weight will cause the pie or doughnut dataset to be drawn with a thickness relative to the sum of all the dataset weight values.
	 * @default 1
	 */
	weight: number;

	/**
	 * Similar to the `offset` option, but applies to all arcs. This can be used to to add spaces
	 * between arcs
	 * @default 0
	 */
	spacing: number;
}

export interface DoughnutAnimationOptions {
	/**
	 *   If true, the chart will animate in with a rotation animation. This property is in the options.animation object.
	 * @default true
	 */
	animateRotate: boolean;

	/**
	 * If true, will animate scaling the chart from the center outwards.
	 * @default false
	 */
	animateScale: boolean;
}

export interface DoughnutControllerChartOptions {
	/**
	 * Sweep to allow arcs to cover.
	 * @default 360
	 */
	circumference: number;

	/**
	 * The portion of the chart that is cut out of the middle. ('50%' - for doughnut, 0 - for pie)
	 * String ending with '%' means percentage, number means pixels.
	 * @default 50
	 */
	cutout: Scriptable<number | string, ScriptableContext<'doughnut'>>;

	/**
	 * Arc offset (in pixels).
	 */
	offset: number;

	/**
	 * The outer radius of the chart. String ending with '%' means percentage of maximum radius, number means pixels.
	 * @default '100%'
	 */
	radius: Scriptable<number | string, ScriptableContext<'doughnut'>>;

	/**
	 * Starting angle to draw arcs from.
	 * @default 0
	 */
	rotation: number;

	/**
	 * Spacing between the arcs
	 * @default 0
	 */
	spacing: number;

	animation: false | DoughnutAnimationOptions;
}

export type DoughnutDataPoint = number;

export interface DoughnutController extends DatasetController {
	readonly innerRadius: number;
	readonly outerRadius: number;
	readonly offsetX: number;
	readonly offsetY: number;

	calculateTotal(): number;
	calculateCircumference(value: number): number;
}

export interface DoughnutController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): DoughnutController;
}

export interface DoughnutMetaExtensions {
	total: number;
}

export type PieControllerDatasetOptions = DoughnutControllerDatasetOptions;
export type PieControllerChartOptions = DoughnutControllerChartOptions;
export type PieAnimationOptions = DoughnutAnimationOptions;

export type PieDataPoint = DoughnutDataPoint;
export type PieMetaExtensions = DoughnutMetaExtensions;

export interface PieController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): PieController;
}

export interface PolarAreaControllerDatasetOptions
	extends DoughnutControllerDatasetOptions {
	/**
	 * Arc angle to cover. - for polar only
	 * @default circumference / (arc count)
	 */
	angle: number;
}

export type PolarAreaAnimationOptions = DoughnutAnimationOptions;

export interface PolarAreaControllerChartOptions {
	/**
	 * Starting angle to draw arcs for the first item in a dataset. In degrees, 0 is at top.
	 * @default 0
	 */
	startAngle: number;

	animation: false | PolarAreaAnimationOptions;
}

export interface PolarAreaController extends DoughnutController {
	countVisibleElements(): number;
}
export interface PolarAreaController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): PolarAreaController;
}

export interface RadarControllerDatasetOptions
	extends ControllerDatasetOptions,
		ScriptableAndArrayOptions<
			PointOptions &
				PointHoverOptions &
				PointPrefixedOptions &
				PointPrefixedHoverOptions,
			ScriptableContext<'radar'>
		>,
		ScriptableAndArrayOptions<
			LineOptions & LineHoverOptions,
			ScriptableContext<'radar'>
		>,
		AnimationOptions<'radar'> {
	/**
	 * The ID of the x axis to plot this dataset on.
	 */
	xAxisID: string;
	/**
	 * The ID of the y axis to plot this dataset on.
	 */
	yAxisID: string;

	/**
	 * If true, lines will be drawn between points with no or null data. If false, points with NaN data will create a break in the line. Can also be a number specifying the maximum gap length to span. The unit of the value depends on the scale used.
	 */
	spanGaps: boolean | number;

	/**
	 * If false, the line is not drawn for this dataset.
	 */
	showLine: boolean;
}

export type RadarControllerChartOptions = LineControllerChartOptions;

export interface RadarController extends ChartComponent {
	new (chart: Chart, datasetIndex: number): RadarController;
}
interface ChartMetaCommon<
	TElement extends Element = Element,
	TDatasetElement extends Element = Element
> {
	type: string;
	controller: DatasetController;
	order: number;

	label: string;
	index: number;
	visible: boolean;

	stack: number;

	indexAxis: 'x' | 'y';

	data: TElement[];
	dataset?: TDatasetElement;

	hidden: boolean;

	xAxisID?: string;
	yAxisID?: string;
	rAxisID?: string;
	iAxisID: string;
	vAxisID: string;

	xScale?: Scale;
	yScale?: Scale;
	rScale?: Scale;
	iScale?: Scale;
	vScale?: Scale;

	_sorted: boolean;
	_stacked: boolean | 'single';
	_parsed: unknown[];
}

export type ChartMeta<
	TElement extends Element = Element,
	TDatasetElement extends Element = Element,
	// TODO - V4, move this to the first parameter.
	// When this was introduced, doing so was a breaking change
	TType extends ChartType = ChartType
> = DeepPartial<
	{ [key in ChartType]: ChartTypeRegistry[key]['metaExtensions'] }[TType]
> &
	ChartMetaCommon<TElement, TDatasetElement>;

export interface ActiveDataPoint {
	datasetIndex: number;
	index: number;
}

export interface ActiveElement extends ActiveDataPoint {
	element: Element;
}

export declare class Chart<
	TType extends ChartType = ChartType,
	TData = DefaultDataPoint<TType>,
	TLabel = unknown
> {
	readonly platform: BasePlatform;
	readonly id: string;
	readonly canvas: HTMLCanvasElement;
	readonly ctx: CanvasRenderingContext2D;
	readonly config: ChartConfiguration<TType, TData, TLabel>;
	readonly width: number;
	readonly height: number;
	readonly aspectRatio: number;
	readonly boxes: LayoutItem[];
	readonly currentDevicePixelRatio: number;
	readonly chartArea: ChartArea;
	readonly scales: { [key: string]: Scale };
	readonly attached: boolean;

	readonly tooltip?: TooltipModel<TType>; // Only available if tooltip plugin is registered and enabled

	data: ChartData<TType, TData, TLabel>;
	options: ChartOptions<TType>;

	new(item: ChartItem, config: ChartConfiguration<TType, TData, TLabel>);

	clear(): this;
	stop(): this;

	resize(width?: number, height?: number): void;
	ensureScalesHaveIDs(): void;
	buildOrUpdateScales(): void;
	buildOrUpdateControllers(): void;
	reset(): void;
	update(mode?: UpdateMode): void;
	render(): void;
	draw(): void;

	getElementsAtEventForMode(
		e: Event,
		mode: string,
		options: InteractionOptions,
		useFinalPosition: boolean
	): InteractionItem[];

	getSortedVisibleDatasetMetas(): ChartMeta[];
	getDatasetMeta(datasetIndex: number): ChartMeta;
	getVisibleDatasetCount(): number;
	isDatasetVisible(datasetIndex: number): boolean;
	setDatasetVisibility(datasetIndex: number, visible: boolean): void;
	toggleDataVisibility(index: number): void;
	getDataVisibility(index: number): boolean;
	hide(datasetIndex: number, dataIndex?: number): void;
	show(datasetIndex: number, dataIndex?: number): void;

	getActiveElements(): ActiveElement[];
	setActiveElements(active: ActiveDataPoint[]): void;

	destroy(): void;
	toBase64Image(type?: string, quality?: unknown): string;
	bindEvents(): void;
	unbindEvents(): void;
	updateHoverStyle(items: Element, mode: 'dataset', enabled: boolean): void;

	notifyPlugins(hook: string, args?: AnyObject): boolean | void;

	static readonly defaults: Defaults;
	static readonly overrides: Overrides;
	static readonly version: string;
	static readonly instances: { [key: string]: Chart };
	static readonly registry: Registry;
	static getChart(
		key: string | CanvasRenderingContext2D | HTMLCanvasElement
	): Chart | undefined;
	static register(...items: ChartComponentLike[]): void;
	static unregister(...items: ChartComponentLike[]): void;
}

export type registerables = ChartComponentLike[];

export declare type ChartItem =
	| string
	| CanvasRenderingContext2D
	| HTMLCanvasElement
	| { canvas: HTMLCanvasElement }
	| ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>;

export declare enum UpdateModeEnum {
	resize = 'resize',
	reset = 'reset',
	none = 'none',
	hide = 'hide',
	show = 'show',
	normal = 'normal',
	active = 'active',
}

export type UpdateMode = keyof typeof UpdateModeEnum;

export interface DatasetController<
	TType extends ChartType = ChartType,
	TElement extends Element = Element,
	TDatasetElement extends Element = Element,
	TParsedData = ParsedDataType<TType>
> {
	new (chart: Chart, datasetIndex: number);

	readonly chart: Chart;
	readonly index: number;
	readonly _cachedMeta: ChartMeta<TElement, TDatasetElement, TType>;
	enableOptionSharing: boolean;

	linkScales(): void;
	getAllParsedValues(scale: Scale): number[];
	getLabelAndValue(index: number): { label: string; value: string };
	updateElements(
		elements: TElement[],
		start: number,
		count: number,
		mode: UpdateMode
	): void;
	update(mode: UpdateMode): void;
	updateIndex(datasetIndex: number): void;
	getMaxOverflow(): boolean | number;
	draw(): void;
	reset(): void;
	getDataset(): ChartDataset;
	getMeta(): ChartMeta<TElement, TDatasetElement, TType>;
	getScaleForId(scaleID: string): Scale | undefined;
	configure(): void;
	initialize(): void;
	addElements(): void;
	buildOrUpdateElements(resetNewElements?: boolean): void;

	getStyle(index: number, active: boolean): AnyObject;
	resolveDatasetElementOptions(mode: UpdateMode): AnyObject;
	resolveDataElementOptions(index: number, mode: UpdateMode): AnyObject;
	/**
	 * Utility for checking if the options are shared and should be animated separately.
	 * @protected
	 */
	getSharedOptions(options: AnyObject): undefined | AnyObject;
	/**
	 * Utility for determining if `options` should be included in the updated properties
	 * @protected
	 */
	includeOptions(mode: UpdateMode, sharedOptions: AnyObject): boolean;
	/**
	 * Utility for updating an element with new properties, using animations when appropriate.
	 * @protected
	 */

	updateElement(
		element: TElement | TDatasetElement,
		index: number | undefined,
		properties: AnyObject,
		mode: UpdateMode
	): void;
	/**
	 * Utility to animate the shared options, that are potentially affecting multiple elements.
	 * @protected
	 */

	updateSharedOptions(
		sharedOptions: AnyObject,
		mode: UpdateMode,
		newOptions: AnyObject
	): void;
	removeHoverStyle(
		element: TElement,
		datasetIndex: number,
		index: number
	): void;
	setHoverStyle(element: TElement, datasetIndex: number, index: number): void;

	parse(start: number, count: number): void;
	parsePrimitiveData(
		meta: ChartMeta<TElement, TDatasetElement, TType>,
		data: AnyObject[],
		start: number,
		count: number
	): AnyObject[];
	parseArrayData(
		meta: ChartMeta<TElement, TDatasetElement, TType>,
		data: AnyObject[],
		start: number,
		count: number
	): AnyObject[];
	parseObjectData(
		meta: ChartMeta<TElement, TDatasetElement, TType>,
		data: AnyObject[],
		start: number,
		count: number
	): AnyObject[];
	getParsed(index: number): TParsedData;
	applyStack(scale: Scale, parsed: unknown[]): number;
	updateRangeFromParsed(
		range: { min: number; max: number },
		scale: Scale,
		parsed: unknown[],
		stack: boolean | string
	): void;
	getMinMax(scale: Scale, canStack?: boolean): { min: number; max: number };
}

export interface DatasetControllerChartComponent extends ChartComponent {
	defaults: {
		datasetElementType?: string | null | false;
		dataElementType?: string | null | false;
	};
}

export interface Defaults
	extends CoreChartOptions<ChartType>,
		ElementChartOptions<ChartType>,
		PluginChartOptions<ChartType> {
	scale: ScaleOptionsByType;
	scales: {
		[key in ScaleType]: ScaleOptionsByType<key>;
	};

	set(values: AnyObject): AnyObject;
	set(scope: string, values: AnyObject): AnyObject;
	get(scope: string): AnyObject;

	describe(scope: string, values: AnyObject): AnyObject;
	override(scope: string, values: AnyObject): AnyObject;

	/**
	 * Routes the named defaults to fallback to another scope/name.
	 * This routing is useful when those target values, like defaults.color, are changed runtime.
	 * If the values would be copied, the runtime change would not take effect. By routing, the
	 * fallback is evaluated at each access, so its always up to date.
	 *
	 * Example:
	 *
	 *   defaults.route('elements.arc', 'backgroundColor', '', 'color')
	 *    - reads the backgroundColor from defaults.color when undefined locally
	 *
	 * @param scope Scope this route applies to.
	 * @param name Property name that should be routed to different namespace when not defined here.
	 * @param targetScope The namespace where those properties should be routed to.
	 * Empty string ('') is the root of defaults.
	 * @param targetName The target name in the target scope the property should be routed to.
	 */
	route(
		scope: string,
		name: string,
		targetScope: string,
		targetName: string
	): void;
}

export type Overrides = {
	[key in ChartType]: CoreChartOptions<key> &
		ElementChartOptions<key> &
		PluginChartOptions<key> &
		DatasetChartOptions<ChartType> &
		ScaleChartOptions<key> &
		ChartTypeRegistry[key]['chartOptions'];
};

export interface InteractionOptions {
	axis?: string;
	intersect?: boolean;
}

export interface InteractionItem {
	element: Element;
	datasetIndex: number;
	index: number;
}

export type InteractionModeFunction = (
	chart: Chart,
	e: ChartEvent,
	options: InteractionOptions,
	useFinalPosition?: boolean
) => InteractionItem[];

export interface InteractionModeMap {
	/**
	 * Returns items at the same index. If the options.intersect parameter is true, we only return items if we intersect something
	 * If the options.intersect mode is false, we find the nearest item and return the items at the same index as that item
	 */
	index: InteractionModeFunction;

	/**
	 * Returns items in the same dataset. If the options.intersect parameter is true, we only return items if we intersect something
	 * If the options.intersect is false, we find the nearest item and return the items in that dataset
	 */
	dataset: InteractionModeFunction;
	/**
	 * Point mode returns all elements that hit test based on the event position
	 * of the event
	 */
	point: InteractionModeFunction;
	/**
	 * nearest mode returns the element closest to the point
	 */
	nearest: InteractionModeFunction;
	/**
	 * x mode returns the elements that hit-test at the current x coordinate
	 */
	x: InteractionModeFunction;
	/**
	 * y mode returns the elements that hit-test at the current y coordinate
	 */
	y: InteractionModeFunction;
}

export type InteractionMode = keyof InteractionModeMap;

export interface Interaction {
	modes: InteractionModeMap;
}

export interface layouts {
	/**
	 * Register a box to a chart.
	 * A box is simply a reference to an object that requires layout. eg. Scales, Legend, Title.
	 * @param {Chart} chart - the chart to use
	 * @param {LayoutItem} item - the item to add to be laid out
	 */
	addBox(chart: Chart, item: LayoutItem): void;

	/**
	 * Remove a layoutItem from a chart
	 * @param {Chart} chart - the chart to remove the box from
	 * @param {LayoutItem} layoutItem - the item to remove from the layout
	 */
	removeBox(chart: Chart, layoutItem: LayoutItem): void;

	/**
	 * Sets (or updates) options on the given `item`.
	 * @param {Chart} chart - the chart in which the item lives (or will be added to)
	 * @param {LayoutItem} item - the item to configure with the given options
	 * @param options - the new item options.
	 */
	configure(
		chart: Chart,
		item: LayoutItem,
		options: { fullSize?: number; position?: LayoutPosition; weight?: number }
	): void;

	/**
	 * Fits boxes of the given chart into the given size by having each box measure itself
	 * then running a fitting algorithm
	 * @param {Chart} chart - the chart
	 * @param {number} width - the width to fit into
	 * @param {number} height - the height to fit into
	 */
	update(chart: Chart, width: number, height: number): void;
}

export interface Plugin<TType extends ChartType = ChartType, O = AnyObject>
	extends ExtendedPlugin<TType, O> {
	id: string;

	/**
	 * @desc Called when plugin is installed for this chart instance. This hook is also invoked for disabled plugins (options === false).
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since 3.0.0
	 */
	install?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called when a plugin is starting. This happens when chart is created or plugin is enabled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since 3.0.0
	 */
	start?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called when a plugin stopping. This happens when chart is destroyed or plugin is disabled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since 3.0.0
	 */
	stop?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called before initializing `chart`.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	beforeInit?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called after `chart` has been initialized and before the first update.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterInit?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called before updating `chart`. If any plugin returns `false`, the update
	 * is cancelled (and thus subsequent render(s)) until another `update` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {UpdateMode} args.mode - The update mode
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart update.
	 */
	beforeUpdate?(
		chart: Chart,
		args: { mode: UpdateMode; cancelable: true },
		options: O
	): boolean | void;
	/**
	 * @desc Called after `chart` has been updated and before rendering. Note that this
	 * hook will not be called if the chart update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {UpdateMode} args.mode - The update mode
	 * @param {object} options - The plugin options.
	 */
	afterUpdate?(chart: Chart, args: { mode: UpdateMode }, options: O): void;
	/**
	 * @desc Called during the update process, before any chart elements have been created.
	 * This can be used for data decimation by changing the data array inside a dataset.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	beforeElementsUpdate?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called during chart reset
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since version 3.0.0
	 */
	reset?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called before updating the `chart` datasets. If any plugin returns `false`,
	 * the datasets update is cancelled until another `update` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {UpdateMode} args.mode - The update mode.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} false to cancel the datasets update.
	 * @since version 2.1.5
	 */
	beforeDatasetsUpdate?(
		chart: Chart,
		args: { mode: UpdateMode },
		options: O
	): boolean | void;
	/**
	 * @desc Called after the `chart` datasets have been updated. Note that this hook
	 * will not be called if the datasets update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {UpdateMode} args.mode - The update mode.
	 * @param {object} options - The plugin options.
	 * @since version 2.1.5
	 */
	afterDatasetsUpdate?(
		chart: Chart,
		args: { mode: UpdateMode; cancelable: true },
		options: O
	): void;
	/**
	 * @desc Called before updating the `chart` dataset at the given `args.index`. If any plugin
	 * returns `false`, the datasets update is cancelled until another `update` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {number} args.index - The dataset index.
	 * @param {object} args.meta - The dataset metadata.
	 * @param {UpdateMode} args.mode - The update mode.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart datasets drawing.
	 */
	beforeDatasetUpdate?(
		chart: Chart,
		args: {
			index: number;
			meta: ChartMeta;
			mode: UpdateMode;
			cancelable: true;
		},
		options: O
	): boolean | void;
	/**
	 * @desc Called after the `chart` datasets at the given `args.index` has been updated. Note
	 * that this hook will not be called if the datasets update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {number} args.index - The dataset index.
	 * @param {object} args.meta - The dataset metadata.
	 * @param {UpdateMode} args.mode - The update mode.
	 * @param {object} options - The plugin options.
	 */
	afterDatasetUpdate?(
		chart: Chart,
		args: {
			index: number;
			meta: ChartMeta;
			mode: UpdateMode;
			cancelable: false;
		},
		options: O
	): void;
	/**
	 * @desc Called before laying out `chart`. If any plugin returns `false`,
	 * the layout update is cancelled until another `update` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart layout.
	 */
	beforeLayout?(
		chart: Chart,
		args: { cancelable: true },
		options: O
	): boolean | void;
	/**
	 * @desc Called before scale data limits are calculated. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	beforeDataLimits?(chart: Chart, args: { scale: Scale }, options: O): void;
	/**
	 * @desc Called after scale data limits are calculated. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	afterDataLimits?(chart: Chart, args: { scale: Scale }, options: O): void;
	/**
	 * @desc Called before scale bulds its ticks. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	beforeBuildTicks?(chart: Chart, args: { scale: Scale }, options: O): void;
	/**
	 * @desc Called after scale has build its ticks. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	afterBuildTicks?(chart: Chart, args: { scale: Scale }, options: O): void;
	/**
	 * @desc Called after the `chart` has been laid out. Note that this hook will not
	 * be called if the layout update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterLayout?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called before rendering `chart`. If any plugin returns `false`,
	 * the rendering is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart rendering.
	 */
	beforeRender?(
		chart: Chart,
		args: { cancelable: true },
		options: O
	): boolean | void;
	/**
	 * @desc Called after the `chart` has been fully rendered (and animation completed). Note
	 * that this hook will not be called if the rendering has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterRender?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called before drawing `chart` at every animation frame. If any plugin returns `false`,
	 * the frame drawing is cancelled untilanother `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart drawing.
	 */
	beforeDraw?(
		chart: Chart,
		args: { cancelable: true },
		options: O
	): boolean | void;
	/**
	 * @desc Called after the `chart` has been drawn. Note that this hook will not be called
	 * if the drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterDraw?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * @desc Called before drawing the `chart` datasets. If any plugin returns `false`,
	 * the datasets drawing is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart datasets drawing.
	 */
	beforeDatasetsDraw?(
		chart: Chart,
		args: { cancelable: true },
		options: O
	): boolean | void;
	/**
	 * @desc Called after the `chart` datasets have been drawn. Note that this hook
	 * will not be called if the datasets drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterDatasetsDraw?(
		chart: Chart,
		args: EmptyObject,
		options: O,
		cancelable: false
	): void;
	/**
	 * @desc Called before drawing the `chart` dataset at the given `args.index` (datasets
	 * are drawn in the reverse order). If any plugin returns `false`, the datasets drawing
	 * is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {number} args.index - The dataset index.
	 * @param {object} args.meta - The dataset metadata.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart datasets drawing.
	 */
	beforeDatasetDraw?(
		chart: Chart,
		args: { index: number; meta: ChartMeta },
		options: O
	): boolean | void;
	/**
	 * @desc Called after the `chart` datasets at the given `args.index` have been drawn
	 * (datasets are drawn in the reverse order). Note that this hook will not be called
	 * if the datasets drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {number} args.index - The dataset index.
	 * @param {object} args.meta - The dataset metadata.
	 * @param {object} options - The plugin options.
	 */
	afterDatasetDraw?(
		chart: Chart,
		args: { index: number; meta: ChartMeta },
		options: O
	): void;
	/**
	 * @desc Called before processing the specified `event`. If any plugin returns `false`,
	 * the event will be discarded.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {ChartEvent} args.event - The event object.
	 * @param {boolean} args.replay - True if this event is replayed from `Chart.update`
	 * @param {boolean} args.inChartArea - The event position is inside chartArea
	 * @param {object} options - The plugin options.
	 */
	beforeEvent?(
		chart: Chart,
		args: {
			event: ChartEvent;
			replay: boolean;
			cancelable: true;
			inChartArea: boolean;
		},
		options: O
	): boolean | void;
	/**
	 * @desc Called after the `event` has been consumed. Note that this hook
	 * will not be called if the `event` has been previously discarded.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {ChartEvent} args.event - The event object.
	 * @param {boolean} args.replay - True if this event is replayed from `Chart.update`
	 * @param {boolean} args.inChartArea - The event position is inside chartArea
	 * @param {boolean} [args.changed] - Set to true if the plugin needs a render. Should only be changed to true, because this args object is passed through all plugins.
	 * @param {object} options - The plugin options.
	 */
	afterEvent?(
		chart: Chart,
		args: {
			event: ChartEvent;
			replay: boolean;
			changed?: boolean;
			cancelable: false;
			inChartArea: boolean;
		},
		options: O
	): void;
	/**
	 * @desc Called after the chart as been resized.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {number} args.size - The new canvas display size (eq. canvas.style width & height).
	 * @param {object} options - The plugin options.
	 */
	resize?(
		chart: Chart,
		args: { size: { width: number; height: number } },
		options: O
	): void;
	/**
	 * Called before the chart is being destroyed.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	beforeDestroy?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * Called after the chart has been destroyed.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @deprecated since version 3.7.0 in favour of afterDestroy
	 */
	destroy?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * Called after the chart has been destroyed.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterDestroy?(chart: Chart, args: EmptyObject, options: O): void;
	/**
	 * Called after chart is destroyed on all plugins that were installed for that chart. This hook is also invoked for disabled plugins (options === false).
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since 3.0.0
	 */
	uninstall?(chart: Chart, args: EmptyObject, options: O): void;
}

export declare type ChartComponentLike =
	| ChartComponent
	| ChartComponent[]
	| { [key: string]: ChartComponent }
	| Plugin
	| Plugin[];

/**
 * Please use the module's default export which provides a singleton instance
 * Note: class is exported for typedoc
 */
export interface Registry {
	readonly controllers: TypedRegistry<DatasetController>;
	readonly elements: TypedRegistry<Element>;
	readonly plugins: TypedRegistry<Plugin>;
	readonly scales: TypedRegistry<Scale>;

	add(...args: ChartComponentLike[]): void;
	remove(...args: ChartComponentLike[]): void;

	addControllers(...args: ChartComponentLike[]): void;
	addElements(...args: ChartComponentLike[]): void;
	addPlugins(...args: ChartComponentLike[]): void;
	addScales(...args: ChartComponentLike[]): void;

	getController(id: string): DatasetController | undefined;
	getElement(id: string): Element | undefined;
	getPlugin(id: string): Plugin | undefined;
	getScale(id: string): Scale | undefined;
}

export type registry = Registry;

export interface Tick {
	value: number;
	label?: string | string[];
	major?: boolean;
}

export interface CoreScaleOptions {
	/**
	 * Controls the axis global visibility (visible when true, hidden when false). When display: 'auto', the axis is visible only if at least one associated dataset is visible.
	 * @default true
	 */
	display: boolean | 'auto';
	/**
	 * Align pixel values to device pixels
	 */
	alignToPixels: boolean;
	/**
	 * Reverse the scale.
	 * @default false
	 */
	reverse: boolean;
	/**
	 * The weight used to sort the axis. Higher weights are further away from the chart area.
	 * @default true
	 */
	weight: number;
	/**
	 * Callback called before the update process starts.
	 */
	beforeUpdate(axis: Scale): void;
	/**
	 * Callback that runs before dimensions are set.
	 */
	beforeSetDimensions(axis: Scale): void;
	/**
	 * Callback that runs after dimensions are set.
	 */
	afterSetDimensions(axis: Scale): void;
	/**
	 * Callback that runs before data limits are determined.
	 */
	beforeDataLimits(axis: Scale): void;
	/**
	 * Callback that runs after data limits are determined.
	 */
	afterDataLimits(axis: Scale): void;
	/**
	 * Callback that runs before ticks are created.
	 */
	beforeBuildTicks(axis: Scale): void;
	/**
	 * Callback that runs after ticks are created. Useful for filtering ticks.
	 */
	afterBuildTicks(axis: Scale): void;
	/**
	 * Callback that runs before ticks are converted into strings.
	 */
	beforeTickToLabelConversion(axis: Scale): void;
	/**
	 * Callback that runs after ticks are converted into strings.
	 */
	afterTickToLabelConversion(axis: Scale): void;
	/**
	 * Callback that runs before tick rotation is determined.
	 */
	beforeCalculateLabelRotation(axis: Scale): void;
	/**
	 * Callback that runs after tick rotation is determined.
	 */
	afterCalculateLabelRotation(axis: Scale): void;
	/**
	 * Callback that runs before the scale fits to the canvas.
	 */
	beforeFit(axis: Scale): void;
	/**
	 * Callback that runs after the scale fits to the canvas.
	 */
	afterFit(axis: Scale): void;
	/**
	 * Callback that runs at the end of the update process.
	 */
	afterUpdate(axis: Scale): void;
}

export interface Scale<O extends CoreScaleOptions = CoreScaleOptions>
	extends Element<unknown, O>,
		LayoutItem {
	readonly id: string;
	readonly type: string;
	readonly ctx: CanvasRenderingContext2D;
	readonly chart: Chart;

	maxWidth: number;
	maxHeight: number;

	paddingTop: number;
	paddingBottom: number;
	paddingLeft: number;
	paddingRight: number;

	axis: string;
	labelRotation: number;
	min: number;
	max: number;
	ticks: Tick[];
	getMatchingVisibleMetas(type?: string): ChartMeta[];

	drawTitle(chartArea: ChartArea): void;
	drawLabels(chartArea: ChartArea): void;
	drawGrid(chartArea: ChartArea): void;

	/**
	 * @param {number} pixel
	 * @return {number}
	 */
	getDecimalForPixel(pixel: number): number;
	/**
	 * Utility for getting the pixel location of a percentage of scale
	 * The coordinate (0, 0) is at the upper-left corner of the canvas
	 * @param {number} decimal
	 * @return {number}
	 */
	getPixelForDecimal(decimal: number): number;
	/**
	 * Returns the location of the tick at the given index
	 * The coordinate (0, 0) is at the upper-left corner of the canvas
	 * @param {number} index
	 * @return {number}
	 */
	getPixelForTick(index: number): number;
	/**
	 * Used to get the label to display in the tooltip for the given value
	 * @param {*} value
	 * @return {string}
	 */
	getLabelForValue(value: number): string;

	/**
	 * Returns the grid line width at given value
	 */
	getLineWidthForValue(value: number): number;

	/**
	 * Returns the location of the given data point. Value can either be an index or a numerical value
	 * The coordinate (0, 0) is at the upper-left corner of the canvas
	 * @param {*} value
	 * @param {number} [index]
	 * @return {number}
	 */
	getPixelForValue(value: number, index?: number): number;

	/**
	 * Used to get the data value from a given pixel. This is the inverse of getPixelForValue
	 * The coordinate (0, 0) is at the upper-left corner of the canvas
	 * @param {number} pixel
	 * @return {*}
	 */
	getValueForPixel(pixel: number): number | undefined;

	getBaseValue(): number;
	/**
	 * Returns the pixel for the minimum chart value
	 * The coordinate (0, 0) is at the upper-left corner of the canvas
	 * @return {number}
	 */
	getBasePixel(): number;

	init(options: O): void;
	parse(raw: unknown, index: number): unknown;
	getUserBounds(): {
		min: number;
		max: number;
		minDefined: boolean;
		maxDefined: boolean;
	};
	getMinMax(canStack: boolean): { min: number; max: number };
	getTicks(): Tick[];
	getLabels(): string[];
	beforeUpdate(): void;
	configure(): void;
	afterUpdate(): void;
	beforeSetDimensions(): void;
	setDimensions(): void;
	afterSetDimensions(): void;
	beforeDataLimits(): void;
	determineDataLimits(): void;
	afterDataLimits(): void;
	beforeBuildTicks(): void;
	buildTicks(): Tick[];
	afterBuildTicks(): void;
	beforeTickToLabelConversion(): void;
	generateTickLabels(ticks: Tick[]): void;
	afterTickToLabelConversion(): void;
	beforeCalculateLabelRotation(): void;
	calculateLabelRotation(): void;
	afterCalculateLabelRotation(): void;
	beforeFit(): void;
	fit(): void;
	afterFit(): void;

	isFullSize(): boolean;
}
export declare class Scale {
	new(cfg: {
		id: string;
		type: string;
		ctx: CanvasRenderingContext2D;
		chart: Chart;
	});
}

export interface ScriptableScaleContext {
	chart: Chart;
	scale: Scale;
	index: number;
	tick: Tick;
}

export interface ScriptableScalePointLabelContext {
	chart: Chart;
	scale: Scale;
	index: number;
	label: string;
}

export interface Ticks {
	formatters: {
		/**
		 * Formatter for value labels
		 * @param value the value to display
		 * @return {string|string[]} the label to display
		 */
		values(value: unknown): string | string[];
		/**
		 * Formatter for numeric ticks
		 * @param tickValue the value to be formatted
		 * @param index the position of the tickValue parameter in the ticks array
		 * @param ticks the list of ticks being converted
		 * @return string representation of the tickValue parameter
		 */
		numeric(
			tickValue: number,
			index: number,
			ticks: { value: number }[]
		): string;
		/**
		 * Formatter for logarithmic ticks
		 * @param tickValue the value to be formatted
		 * @param index the position of the tickValue parameter in the ticks array
		 * @param ticks the list of ticks being converted
		 * @return string representation of the tickValue parameter
		 */
		logarithmic(
			tickValue: number,
			index: number,
			ticks: { value: number }[]
		): string;
	};
}

export interface TypedRegistry<T> {
	/**
	 * @param {ChartComponent} item
	 * @returns {string} The scope where items defaults were registered to.
	 */
	register(item: ChartComponent): string;
	get(id: string): T | undefined;
	unregister(item: ChartComponent): void;
}

export interface ChartEvent {
	type:
		| 'contextmenu'
		| 'mouseenter'
		| 'mousedown'
		| 'mousemove'
		| 'mouseup'
		| 'mouseout'
		| 'click'
		| 'dblclick'
		| 'keydown'
		| 'keypress'
		| 'keyup'
		| 'resize';
	native: Event | null;
	x: number | null;
	y: number | null;
}
export interface ChartComponent {
	id: string;
	defaults?: AnyObject;
	defaultRoutes?: { [property: string]: string };

	beforeRegister?(): void;
	afterRegister?(): void;
	beforeUnregister?(): void;
	afterUnregister?(): void;
}

export interface CoreInteractionOptions {
	/**
	 * Sets which elements appear in the tooltip. See Interaction Modes for details.
	 * @default 'nearest'
	 */
	mode: InteractionMode;
	/**
	 * if true, the hover mode only applies when the mouse position intersects an item on the chart.
	 * @default true
	 */
	intersect: boolean;

	/**
	 * Can be set to 'x', 'y', 'xy' or 'r' to define which directions are used in calculating distances. Defaults to 'x' for 'index' mode and 'xy' in dataset and 'nearest' modes.
	 */
	axis: 'x' | 'y' | 'xy' | 'r';
}

export interface CoreChartOptions<TType extends ChartType>
	extends ParsingOptions,
		AnimationOptions<TType> {
	datasets: {
		[key in ChartType]: ChartTypeRegistry[key]['datasetOptions'];
	};

	/**
	 * The base axis of the chart. 'x' for vertical charts and 'y' for horizontal charts.
	 * @default 'x'
	 */
	indexAxis: 'x' | 'y';

	/**
	 * base color
	 * @see Defaults.color
	 */
	color: Scriptable<Color, ScriptableContext<TType>>;
	/**
	 * base background color
	 * @see Defaults.backgroundColor
	 */
	backgroundColor: Scriptable<Color, ScriptableContext<TType>>;
	/**
	 * base border color
	 * @see Defaults.borderColor
	 */
	borderColor: Scriptable<Color, ScriptableContext<TType>>;
	/**
	 * base font
	 * @see Defaults.font
	 */
	font: Partial<FontSpec>;
	/**
	 * Resizes the chart canvas when its container does (important note...).
	 * @default true
	 */
	responsive: boolean;
	/**
	 * Maintain the original canvas aspect ratio (width / height) when resizing.
	 * @default true
	 */
	maintainAspectRatio: boolean;
	/**
	 * Delay the resize update by give amount of milliseconds. This can ease the resize process by debouncing update of the elements.
	 * @default 0
	 */
	resizeDelay: number;

	/**
	 * Canvas aspect ratio (i.e. width / height, a value of 1 representing a square canvas). Note that this option is ignored if the height is explicitly defined either as attribute or via the style.
	 * @default 2
	 */
	aspectRatio: number;

	/**
	 * Locale used for number formatting (using `Intl.NumberFormat`).
	 * @default user's browser setting
	 */
	locale: string;

	/**
	 * Called when a resize occurs. Gets passed two arguments: the chart instance and the new size.
	 */
	onResize(chart: Chart, size: { width: number; height: number }): void;

	/**
	 * Override the window's default devicePixelRatio.
	 * @default window.devicePixelRatio
	 */
	devicePixelRatio: number;

	interaction: CoreInteractionOptions;

	hover: CoreInteractionOptions;

	/**
	 * The events option defines the browser events that the chart should listen to for tooltips and hovering.
	 * @default ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']
	 */
	events: (
		| 'mousemove'
		| 'mouseout'
		| 'click'
		| 'touchstart'
		| 'touchmove'
		| 'touchend'
		| 'pointerenter'
		| 'pointerdown'
		| 'pointermove'
		| 'pointerup'
		| 'pointerleave'
		| 'pointerout'
	)[];

	/**
	 * Called when any of the events fire. Passed the event, an array of active elements (bars, points, etc), and the chart.
	 */
	onHover(event: ChartEvent, elements: ActiveElement[], chart: Chart): void;

	/**
	 * Called if the event is of type 'mouseup' or 'click'. Passed the event, an array of active elements, and the chart.
	 */
	onClick(event: ChartEvent, elements: ActiveElement[], chart: Chart): void;

	layout: Partial<{
		autoPadding: boolean;
		padding: Scriptable<number | Partial<ChartArea>, ScriptableContext<TType>>;
	}>;
}

export type EasingFunction =
	| 'linear'
	| 'easeInQuad'
	| 'easeOutQuad'
	| 'easeInOutQuad'
	| 'easeInCubic'
	| 'easeOutCubic'
	| 'easeInOutCubic'
	| 'easeInQuart'
	| 'easeOutQuart'
	| 'easeInOutQuart'
	| 'easeInQuint'
	| 'easeOutQuint'
	| 'easeInOutQuint'
	| 'easeInSine'
	| 'easeOutSine'
	| 'easeInOutSine'
	| 'easeInExpo'
	| 'easeOutExpo'
	| 'easeInOutExpo'
	| 'easeInCirc'
	| 'easeOutCirc'
	| 'easeInOutCirc'
	| 'easeInElastic'
	| 'easeOutElastic'
	| 'easeInOutElastic'
	| 'easeInBack'
	| 'easeOutBack'
	| 'easeInOutBack'
	| 'easeInBounce'
	| 'easeOutBounce'
	| 'easeInOutBounce';

export type AnimationSpec<TType extends ChartType> = {
	/**
	 * The number of milliseconds an animation takes.
	 * @default 1000
	 */
	duration?: Scriptable<number, ScriptableContext<TType>>;
	/**
	 * Easing function to use
	 * @default 'easeOutQuart'
	 */
	easing?: Scriptable<EasingFunction, ScriptableContext<TType>>;

	/**
	 * Delay before starting the animations.
	 * @default 0
	 */
	delay?: Scriptable<number, ScriptableContext<TType>>;

	/**
	 *   If set to true, the animations loop endlessly.
	 * @default false
	 */
	loop?: Scriptable<boolean, ScriptableContext<TType>>;
};

export type AnimationsSpec<TType extends ChartType> = {
	[name: string]:
		| false
		| (AnimationSpec<TType> & {
				properties: string[];

				/**
				 * Type of property, determines the interpolator used. Possible values: 'number', 'color' and 'boolean'. Only really needed for 'color', because typeof does not get that right.
				 */
				type: 'color' | 'number' | 'boolean';

				fn: <T>(from: T, to: T, factor: number) => T;

				/**
				 * Start value for the animation. Current value is used when undefined
				 */
				from: Scriptable<Color | number | boolean, ScriptableContext<TType>>;
				/**
				 *
				 */
				to: Scriptable<Color | number | boolean, ScriptableContext<TType>>;
		  });
};

export type TransitionSpec<TType extends ChartType> = {
	animation: AnimationSpec<TType>;
	animations: AnimationsSpec<TType>;
};

export type TransitionsSpec<TType extends ChartType> = {
	[mode: string]: TransitionSpec<TType>;
};

export type AnimationOptions<TType extends ChartType> = {
	animation:
		| false
		| (AnimationSpec<TType> & {
				/**
				 * Callback called on each step of an animation.
				 */
				onProgress?: (this: Chart, event: AnimationEvent) => void;
				/**
				 * Callback called when all animations are completed.
				 */
				onComplete?: (this: Chart, event: AnimationEvent) => void;
		  });
	animations: AnimationsSpec<TType>;
	transitions: TransitionsSpec<TType>;
};

export interface FontSpec {
	/**
	 * Default font family for all text, follows CSS font-family options.
	 * @default "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
	 */
	family: string;
	/**
	 * Default font size (in px) for text. Does not apply to radialLinear scale point labels.
	 * @default 12
	 */
	size: number;
	/**
	 * Default font style. Does not apply to tooltip title or footer. Does not apply to chart title. Follows CSS font-style options (i.e. normal, italic, oblique, initial, inherit)
	 * @default 'normal'
	 */
	style: 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit';
	/**
	 * Default font weight (boldness). (see MDN).
	 */
	weight: string | null;
	/**
	 * Height of an individual line of text (see MDN).
	 * @default 1.2
	 */
	lineHeight: number | string;
}

export type TextAlign = 'left' | 'center' | 'right';

export interface VisualElement {
	draw(ctx: CanvasRenderingContext2D, area?: ChartArea): void;
	inRange(mouseX: number, mouseY: number, useFinalPosition?: boolean): boolean;
	inXRange(mouseX: number, useFinalPosition?: boolean): boolean;
	inYRange(mouseY: number, useFinalPosition?: boolean): boolean;
	getCenterPoint(useFinalPosition?: boolean): { x: number; y: number };
	getRange?(axis: 'x' | 'y'): number;
}

export interface CommonElementOptions {
	borderWidth: number;
	borderColor: Color;
	backgroundColor: Color;
}

export interface CommonHoverOptions {
	hoverBorderWidth: number;
	hoverBorderColor: Color;
	hoverBackgroundColor: Color;
}

export interface Segment {
	start: number;
	end: number;
	loop: boolean;
}

export interface ArcProps {
	x: number;
	y: number;
	startAngle: number;
	endAngle: number;
	innerRadius: number;
	outerRadius: number;
	circumference: number;
}

export interface ArcBorderRadius {
	outerStart: number;
	outerEnd: number;
	innerStart: number;
	innerEnd: number;
}

export interface ArcOptions extends CommonElementOptions {
	/**
	 * Arc stroke alignment.
	 */
	borderAlign: 'center' | 'inner';

	/**
	 * Line join style. See MDN. Default is 'round' when `borderAlign` is 'inner', else 'bevel'.
	 */
	borderJoinStyle: CanvasLineJoin;

	/**
	 * Sets the border radius for arcs
	 * @default 0
	 */
	borderRadius: number | ArcBorderRadius;

	/**
	 * Arc offset (in pixels).
	 */
	offset: number;
}

export interface ArcHoverOptions extends CommonHoverOptions {
	hoverOffset: number;
}

export interface ArcElement<
	T extends ArcProps = ArcProps,
	O extends ArcOptions = ArcOptions
> extends Element<T, O>,
		VisualElement {}

export interface ArcElement extends ChartComponent {
	new (cfg: AnyObject): ArcElement;
}

export interface LineProps {
	points: Point[];
}

export interface LineOptions extends CommonElementOptions {
	/**
	 * Line cap style. See MDN.
	 * @default 'butt'
	 */
	borderCapStyle: CanvasLineCap;
	/**
	 * Line dash. See MDN.
	 * @default []
	 */
	borderDash: number[];
	/**
	 * Line dash offset. See MDN.
	 * @default 0.0
	 */
	borderDashOffset: number;
	/**
	 * Line join style. See MDN.
	 * @default 'miter'
	 */
	borderJoinStyle: CanvasLineJoin;
	/**
	 *   true to keep Bézier control inside the chart, false for no restriction.
	 * @default true
	 */
	capBezierPoints: boolean;
	/**
	 * Interpolation mode to apply.
	 * @default 'default'
	 */
	cubicInterpolationMode: 'default' | 'monotone';
	/**
	 * Bézier curve tension (0 for no Bézier curves).
	 * @default 0
	 */
	tension: number;
	/**
	 * true to show the line as a stepped line (tension will be ignored).
	 * @default false
	 */
	stepped: 'before' | 'after' | 'middle' | boolean;
	/**
	 * Both line and radar charts support a fill option on the dataset object which can be used to create area between two datasets or a dataset and a boundary, i.e. the scale origin, start or end
	 */
	fill: FillTarget | ComplexFillTarget;

	segment: {
		backgroundColor: Scriptable<
			Color | undefined,
			ScriptableLineSegmentContext
		>;
		borderColor: Scriptable<Color | undefined, ScriptableLineSegmentContext>;
		borderCapStyle: Scriptable<
			CanvasLineCap | undefined,
			ScriptableLineSegmentContext
		>;
		borderDash: Scriptable<number[] | undefined, ScriptableLineSegmentContext>;
		borderDashOffset: Scriptable<
			number | undefined,
			ScriptableLineSegmentContext
		>;
		borderJoinStyle: Scriptable<
			CanvasLineJoin | undefined,
			ScriptableLineSegmentContext
		>;
		borderWidth: Scriptable<number | undefined, ScriptableLineSegmentContext>;
	};
}

export interface LineHoverOptions extends CommonHoverOptions {
	hoverBorderCapStyle: CanvasLineCap;
	hoverBorderDash: number[];
	hoverBorderDashOffset: number;
	hoverBorderJoinStyle: CanvasLineJoin;
}

export interface LineElement<
	T extends LineProps = LineProps,
	O extends LineOptions = LineOptions
> extends Element<T, O>,
		VisualElement {
	updateControlPoints(chartArea: ChartArea, indexAxis?: 'x' | 'y'): void;
	points: Point[];
	readonly segments: Segment[];
	first(): Point | false;
	last(): Point | false;
	interpolate(point: Point, property: 'x' | 'y'): undefined | Point | Point[];
	pathSegment(
		ctx: CanvasRenderingContext2D,
		segment: Segment,
		params: AnyObject
	): undefined | boolean;
	path(ctx: CanvasRenderingContext2D): boolean;
}

export interface LineElement extends ChartComponent {
	new (cfg: AnyObject): LineElement;
}

export interface PointProps {
	x: number;
	y: number;
}

export type PointStyle =
	| 'circle'
	| 'cross'
	| 'crossRot'
	| 'dash'
	| 'line'
	| 'rect'
	| 'rectRounded'
	| 'rectRot'
	| 'star'
	| 'triangle'
	| HTMLImageElement
	| HTMLCanvasElement;

export interface PointOptions extends CommonElementOptions {
	/**
	 * Point radius
	 * @default 3
	 */
	radius: number;
	/**
	 * Extra radius added to point radius for hit detection.
	 * @default 1
	 */
	hitRadius: number;
	/**
	 * Point style
	 * @default 'circle;
	 */
	pointStyle: PointStyle;
	/**
	 * Point rotation (in degrees).
	 * @default 0
	 */
	rotation: number;
	/**
	 * Draw the active elements over the other elements of the dataset,
	 * @default true
	 */
	drawActiveElementsOnTop: boolean;
}

export interface PointHoverOptions extends CommonHoverOptions {
	/**
	 * Point radius when hovered.
	 * @default 4
	 */
	hoverRadius: number;
}

export interface PointPrefixedOptions {
	/**
	 * The fill color for points.
	 */
	pointBackgroundColor: Color;
	/**
	 * The border color for points.
	 */
	pointBorderColor: Color;
	/**
	 * The width of the point border in pixels.
	 */
	pointBorderWidth: number;
	/**
	 * The pixel size of the non-displayed point that reacts to mouse events.
	 */
	pointHitRadius: number;
	/**
	 * The radius of the point shape. If set to 0, the point is not rendered.
	 */
	pointRadius: number;
	/**
	 * The rotation of the point in degrees.
	 */
	pointRotation: number;
	/**
	 * Style of the point.
	 */
	pointStyle: PointStyle;
}

export interface PointPrefixedHoverOptions {
	/**
	 * Point background color when hovered.
	 */
	pointHoverBackgroundColor: Color;
	/**
	 * Point border color when hovered.
	 */
	pointHoverBorderColor: Color;
	/**
	 * Border width of point when hovered.
	 */
	pointHoverBorderWidth: number;
	/**
	 * The radius of the point when hovered.
	 */
	pointHoverRadius: number;
}

export interface PointElement<
	T extends PointProps = PointProps,
	O extends PointOptions = PointOptions
> extends Element<T, O>,
		VisualElement {
	readonly skip: boolean;
	readonly parsed: CartesianParsedData;
}

export interface PointElement extends ChartComponent {
	new (cfg: AnyObject): PointElement;
}

export interface BarProps {
	x: number;
	y: number;
	base: number;
	horizontal: boolean;
	width: number;
	height: number;
}

export interface BarOptions extends Omit<CommonElementOptions, 'borderWidth'> {
	/**
	 * The base value for the bar in data units along the value axis.
	 */
	base: number;

	/**
	 * Skipped (excluded) border: 'start', 'end', 'left',  'right', 'bottom', 'top' or false (none).
	 * @default 'start'
	 */
	borderSkipped: 'start' | 'end' | 'left' | 'right' | 'bottom' | 'top' | false;

	/**
	 * Border radius
	 * @default 0
	 */
	borderRadius: number | BorderRadius;

	/**
	 * Amount to inflate the rectangle(s). This can be used to hide artifacts between bars.
	 * Unit is pixels. 'auto' translates to 0.33 pixels when barPercentage * categoryPercentage is 1, else 0.
	 * @default 'auto'
	 */
	inflateAmount: number | 'auto';

	/**
	 * Width of the border, number for all sides, object to specify width for each side specifically
	 * @default 0
	 */
	borderWidth:
		| number
		| { top?: number; right?: number; bottom?: number; left?: number };
}

export interface BorderRadius {
	topLeft: number;
	topRight: number;
	bottomLeft: number;
	bottomRight: number;
}

export interface BarHoverOptions extends CommonHoverOptions {
	hoverBorderRadius: number | BorderRadius;
}

export interface BarElement<
	T extends BarProps = BarProps,
	O extends BarOptions = BarOptions
> extends Element<T, O>,
		VisualElement {}

export interface BarElement extends ChartComponent {
	new (cfg: AnyObject): BarElement;
}

export interface ElementOptionsByType<TType extends ChartType> {
	arc: ScriptableAndArrayOptions<
		ArcOptions & ArcHoverOptions,
		ScriptableContext<TType>
	>;
	bar: ScriptableAndArrayOptions<
		BarOptions & BarHoverOptions,
		ScriptableContext<TType>
	>;
	line: ScriptableAndArrayOptions<
		LineOptions & LineHoverOptions,
		ScriptableContext<TType>
	>;
	point: ScriptableAndArrayOptions<
		PointOptions & PointHoverOptions,
		ScriptableContext<TType>
	>;
}

export type ElementChartOptions<TType extends ChartType = ChartType> = {
	elements: ElementOptionsByType<TType>;
};

export interface BasePlatform {
	/**
	 * Called at chart construction time, returns a context2d instance implementing
	 * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
	 * @param {HTMLCanvasElement} canvas - The canvas from which to acquire context (platform specific)
	 * @param options - The chart options
	 */
	acquireContext(
		canvas: HTMLCanvasElement,
		options?: CanvasRenderingContext2DSettings
	): CanvasRenderingContext2D | null;
	/**
	 * Called at chart destruction time, releases any resources associated to the context
	 * previously returned by the acquireContext() method.
	 * @param {CanvasRenderingContext2D} context - The context2d instance
	 * @returns {boolean} true if the method succeeded, else false
	 */
	releaseContext(context: CanvasRenderingContext2D): boolean;
	/**
	 * Registers the specified listener on the given chart.
	 * @param {Chart} chart - Chart from which to listen for event
	 * @param {string} type - The ({@link ChartEvent}) type to listen for
	 * @param listener - Receives a notification (an object that implements
	 * the {@link ChartEvent} interface) when an event of the specified type occurs.
	 */
	addEventListener(
		chart: Chart,
		type: string,
		listener: (e: ChartEvent) => void
	): void;
	/**
	 * Removes the specified listener previously registered with addEventListener.
	 * @param {Chart} chart - Chart from which to remove the listener
	 * @param {string} type - The ({@link ChartEvent}) type to remove
	 * @param listener - The listener function to remove from the event target.
	 */
	removeEventListener(
		chart: Chart,
		type: string,
		listener: (e: ChartEvent) => void
	): void;
	/**
	 * @returns {number} the current devicePixelRatio of the device this platform is connected to.
	 */
	getDevicePixelRatio(): number;
	/**
	 * @param {HTMLCanvasElement} canvas - The canvas for which to calculate the maximum size
	 * @param {number} [width] - Parent element's content width
	 * @param {number} [height] - Parent element's content height
	 * @param {number} [aspectRatio] - The aspect ratio to maintain
	 * @returns { width: number, height: number } the maximum size available.
	 */
	getMaximumSize(
		canvas: HTMLCanvasElement,
		width?: number,
		height?: number,
		aspectRatio?: number
	): { width: number; height: number };
	/**
	 * @param {HTMLCanvasElement} canvas
	 * @returns {boolean} true if the canvas is attached to the platform, false if not.
	 */
	isAttached(canvas: HTMLCanvasElement): boolean;
	/**
	 * Updates config with platform specific requirements
	 * @param {ChartConfiguration} config
	 */
	updateConfig(config: ChartConfiguration): void;
}

export interface BasicPlatform extends BasePlatform {}
export interface DomPlatform extends BasePlatform {}

export type Decimation = Plugin;

export enum DecimationAlgorithm {
	lttb = 'lttb',
	minmax = 'min-max',
}
interface BaseDecimationOptions {
	enabled: boolean;
	threshold?: number;
}

interface LttbDecimationOptions extends BaseDecimationOptions {
	algorithm: DecimationAlgorithm.lttb | 'lttb';
	samples?: number;
}

interface MinMaxDecimationOptions extends BaseDecimationOptions {
	algorithm: DecimationAlgorithm.minmax | 'min-max';
}

export type DecimationOptions = LttbDecimationOptions | MinMaxDecimationOptions;

export type Filler = Plugin;
export interface FillerOptions {
	drawTime: 'beforeDatasetDraw' | 'beforeDatasetsDraw';
	propagate: boolean;
}

export type FillTarget =
	| number
	| string
	| { value: number }
	| 'start'
	| 'end'
	| 'origin'
	| 'stack'
	| 'shape'
	| boolean;

export interface ComplexFillTarget {
	/**
	 * The accepted values are the same as the filling mode values, so you may use absolute and relative dataset indexes and/or boundaries.
	 */
	target: FillTarget;
	/**
	 * If no color is set, the default color will be the background color of the chart.
	 */
	above: Color;
	/**
	 * Same as the above.
	 */
	below: Color;
}

export interface FillerControllerDatasetOptions {
	/**
	 * Both line and radar charts support a fill option on the dataset object which can be used to create area between two datasets or a dataset and a boundary, i.e. the scale origin, start or end
	 */
	fill: FillTarget | ComplexFillTarget;
}

export type Legend = Plugin;

export interface LegendItem {
	/**
	 * Label that will be displayed
	 */
	text: string;

	/**
	 * Border radius of the legend box
	 * @since 3.1.0
	 */
	borderRadius?: number | BorderRadius;

	/**
	 * Index of the associated dataset
	 */
	datasetIndex: number;

	/**
	 * Fill style of the legend box
	 */
	fillStyle?: Color;

	/**
	 * Font color for the text
	 * Defaults to LegendOptions.labels.color
	 */
	fontColor?: Color;

	/**
	 * If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect
	 */
	hidden?: boolean;

	/**
	 * For box border.
	 * @see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap
	 */
	lineCap?: CanvasLineCap;

	/**
	 * For box border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
	 */
	lineDash?: number[];

	/**
	 * For box border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
	 */
	lineDashOffset?: number;

	/**
	 * For box border.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
	 */
	lineJoin?: CanvasLineJoin;

	/**
	 * Width of box border
	 */
	lineWidth?: number;

	/**
	 * Stroke style of the legend box
	 */
	strokeStyle?: Color;

	/**
	 * Point style of the legend box (only used if usePointStyle is true)
	 */
	pointStyle?: PointStyle;

	/**
	 * Rotation of the point in degrees (only used if usePointStyle is true)
	 */
	rotation?: number;

	/**
	 * Text alignment
	 */
	textAlign?: TextAlign;
}

export interface LegendElement<TType extends ChartType>
	extends Element<AnyObject, LegendOptions<TType>>,
		LayoutItem {
	chart: Chart<TType>;
	ctx: CanvasRenderingContext2D;
	legendItems?: LegendItem[];
	options: LegendOptions<TType>;
}

export interface LegendOptions<TType extends ChartType> {
	/**
	 * Is the legend shown?
	 * @default true
	 */
	display: boolean;
	/**
	 * Position of the legend.
	 * @default 'top'
	 */
	position: LayoutPosition;
	/**
	 * Alignment of the legend.
	 * @default 'center'
	 */
	align: 'start' | 'center' | 'end';
	/**
	 * Maximum height of the legend, in pixels
	 */
	maxHeight: number;
	/**
	 * Maximum width of the legend, in pixels
	 */
	maxWidth: number;
	/**
	 * Marks that this box should take the full width/height of the canvas (moving other boxes). This is unlikely to need to be changed in day-to-day use.
	 * @default true
	 */
	fullSize: boolean;
	/**
	 * Legend will show datasets in reverse order.
	 * @default false
	 */
	reverse: boolean;
	/**
	 * A callback that is called when a click event is registered on a label item.
	 */
	onClick(
		this: LegendElement<TType>,
		e: ChartEvent,
		legendItem: LegendItem,
		legend: LegendElement<TType>
	): void;
	/**
	 * A callback that is called when a 'mousemove' event is registered on top of a label item
	 */
	onHover(
		this: LegendElement<TType>,
		e: ChartEvent,
		legendItem: LegendItem,
		legend: LegendElement<TType>
	): void;
	/**
	 * A callback that is called when a 'mousemove' event is registered outside of a previously hovered label item.
	 */
	onLeave(
		this: LegendElement<TType>,
		e: ChartEvent,
		legendItem: LegendItem,
		legend: LegendElement<TType>
	): void;

	labels: {
		/**
		 * Width of colored box.
		 * @default 40
		 */
		boxWidth: number;
		/**
		 * Height of the coloured box.
		 * @default fontSize
		 */
		boxHeight: number;
		/**
		 * Padding between the color box and the text
		 * @default 1
		 */
		boxPadding: number;
		/**
		 * Color of label
		 * @see Defaults.color
		 */
		color: Color;
		/**
		 * Font of label
		 * @see Defaults.font
		 */
		font: FontSpec;
		/**
		 * Padding between rows of colored boxes.
		 * @default 10
		 */
		padding: number;
		/**
		 * Generates legend items for each thing in the legend. Default implementation returns the text + styling for the color box. See Legend Item for details.
		 */
		generateLabels(chart: Chart): LegendItem[];

		/**
		 * Filters legend items out of the legend. Receives 2 parameters, a Legend Item and the chart data
		 */
		filter(item: LegendItem, data: ChartData): boolean;

		/**
		 * Sorts the legend items
		 */
		sort(a: LegendItem, b: LegendItem, data: ChartData): number;

		/**
		 * Override point style for the legend. Only applies if usePointStyle is true
		 */
		pointStyle: PointStyle;

		/**
		 * Text alignment
		 */
		textAlign?: TextAlign;

		/**
		 * Label style will match corresponding point style (size is based on the minimum value between boxWidth and font.size).
		 * @default false
		 */
		usePointStyle: boolean;
	};
	/**
	 * true for rendering the legends from right to left.
	 */
	rtl: boolean;
	/**
	 * This will force the text direction 'rtl' or 'ltr' on the canvas for rendering the legend, regardless of the css specified on the canvas
	 * @default canvas' default
	 */
	textDirection: string;

	title: {
		/**
		 * Is the legend title displayed.
		 * @default false
		 */
		display: boolean;
		/**
		 * Color of title
		 * @see Defaults.color
		 */
		color: Color;
		/**
		 * see Fonts
		 */
		font: FontSpec;
		position: 'center' | 'start' | 'end';
		padding?: number | ChartArea;
		/**
		 * The string title.
		 */
		text: string;
	};
}

export type SubTitle = Plugin;
export type Title = Plugin;

export interface TitleOptions {
	/**
	 * Alignment of the title.
	 * @default 'center'
	 */
	align: 'start' | 'center' | 'end';
	/**
	 * Is the title shown?
	 * @default false
	 */
	display: boolean;
	/**
	 * Position of title
	 * @default 'top'
	 */
	position: 'top' | 'left' | 'bottom' | 'right';
	/**
	 * Color of text
	 * @see Defaults.color
	 */
	color: Color;
	font: FontSpec;

	/**
	 * Marks that this box should take the full width/height of the canvas (moving other boxes). If set to `false`, places the box above/beside the
	 * chart area
	 * @default true
	 */
	fullSize: boolean;
	/**
	 *   Adds padding above and below the title text if a single number is specified. It is also possible to change top and bottom padding separately.
	 */
	padding: number | { top: number; bottom: number };
	/**
	 *   Title text to display. If specified as an array, text is rendered on multiple lines.
	 */
	text: string | string[];
}

export type TooltipXAlignment = 'left' | 'center' | 'right';
export type TooltipYAlignment = 'top' | 'center' | 'bottom';
export interface TooltipLabelStyle {
	borderColor: Color;
	backgroundColor: Color;

	/**
	 * Width of border line
	 * @since 3.1.0
	 */
	borderWidth?: number;

	/**
	 * Border dash
	 * @since 3.1.0
	 */
	borderDash?: [number, number];

	/**
	 * Border dash offset
	 * @since 3.1.0
	 */
	borderDashOffset?: number;

	/**
	 * borderRadius
	 * @since 3.1.0
	 */
	borderRadius?: number | BorderRadius;
}
export interface TooltipModel<TType extends ChartType>
	extends Element<AnyObject, TooltipOptions<TType>> {
	readonly chart: Chart<TType>;

	// The items that we are rendering in the tooltip. See Tooltip Item Interface section
	dataPoints: TooltipItem<TType>[];

	// Positioning
	xAlign: TooltipXAlignment;
	yAlign: TooltipYAlignment;

	// X and Y properties are the top left of the tooltip
	x: number;
	y: number;
	width: number;
	height: number;
	// Where the tooltip points to
	caretX: number;
	caretY: number;

	// Body
	// The body lines that need to be rendered
	// Each object contains 3 parameters
	// before: string[] // lines of text before the line with the color square
	// lines: string[]; // lines of text to render as the main item with color square
	// after: string[]; // lines of text to render after the main lines
	body: { before: string[]; lines: string[]; after: string[] }[];
	// lines of text that appear after the title but before the body
	beforeBody: string[];
	// line of text that appear after the body and before the footer
	afterBody: string[];

	// Title
	// lines of text that form the title
	title: string[];

	// Footer
	// lines of text that form the footer
	footer: string[];

	// Styles to render for each item in body[]. This is the styling of the squares in the tooltip
	labelColors: TooltipLabelStyle[];
	labelTextColors: Color[];
	labelPointStyles: { pointStyle: PointStyle; rotation: number }[];

	// 0 opacity is a hidden tooltip
	opacity: number;

	// tooltip options
	options: TooltipOptions<TType>;

	getActiveElements(): ActiveElement[];
	setActiveElements(active: ActiveDataPoint[], eventPosition: Point): void;
}

export interface TooltipPosition {
	x: number;
	y: number;
	xAlign?: TooltipXAlignment;
	yAlign?: TooltipYAlignment;
}

export type TooltipPositionerFunction<TType extends ChartType> = (
	this: TooltipModel<TType>,
	items: readonly ActiveElement[],
	eventPosition: Point
) => TooltipPosition | false;

export interface TooltipPositionerMap {
	average: TooltipPositionerFunction<ChartType>;
	nearest: TooltipPositionerFunction<ChartType>;
}

export type TooltipPositioner = keyof TooltipPositionerMap;

export interface Tooltip extends Plugin {
	readonly positioners: TooltipPositionerMap;
}

export interface TooltipCallbacks<
	TType extends ChartType,
	Model = TooltipModel<TType>,
	Item = TooltipItem<TType>
> {
	beforeTitle(this: Model, tooltipItems: Item[]): string | string[];
	title(this: Model, tooltipItems: Item[]): string | string[];
	afterTitle(this: Model, tooltipItems: Item[]): string | string[];

	beforeBody(this: Model, tooltipItems: Item[]): string | string[];
	afterBody(this: Model, tooltipItems: Item[]): string | string[];

	beforeLabel(this: Model, tooltipItem: Item): string | string[];
	label(this: Model, tooltipItem: Item): string | string[];
	afterLabel(this: Model, tooltipItem: Item): string | string[];

	labelColor(this: Model, tooltipItem: Item): TooltipLabelStyle;
	labelTextColor(this: Model, tooltipItem: Item): Color;
	labelPointStyle(
		this: Model,
		tooltipItem: Item
	): { pointStyle: PointStyle; rotation: number };

	beforeFooter(this: Model, tooltipItems: Item[]): string | string[];
	footer(this: Model, tooltipItems: Item[]): string | string[];
	afterFooter(this: Model, tooltipItems: Item[]): string | string[];
}

export interface ExtendedPlugin<
	TType extends ChartType,
	O = AnyObject,
	Model = TooltipModel<TType>
> {
	/**
	 * @desc Called before drawing the `tooltip`. If any plugin returns `false`,
	 * the tooltip drawing is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Tooltip} args.tooltip - The tooltip.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart tooltip drawing.
	 */
	beforeTooltipDraw?(
		chart: Chart,
		args: { tooltip: Model },
		options: O
	): boolean | void;
	/**
	 * @desc Called after drawing the `tooltip`. Note that this hook will not
	 * be called if the tooltip drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Tooltip} args.tooltip - The tooltip.
	 * @param {object} options - The plugin options.
	 */
	afterTooltipDraw?(chart: Chart, args: { tooltip: Model }, options: O): void;
}

export interface ScriptableTooltipContext<TType extends ChartType> {
	chart: UnionToIntersection<Chart<TType>>;
	tooltip: UnionToIntersection<TooltipModel<TType>>;
	tooltipItems: TooltipItem<TType>[];
}

export interface TooltipOptions<TType extends ChartType = ChartType>
	extends CoreInteractionOptions {
	/**
	 * Are on-canvas tooltips enabled?
	 * @default true
	 */
	enabled: Scriptable<boolean, ScriptableTooltipContext<TType>>;
	/**
	 *   See external tooltip section.
	 */
	external(
		this: TooltipModel<TType>,
		args: { chart: Chart; tooltip: TooltipModel<TType> }
	): void;
	/**
	 * The mode for positioning the tooltip
	 */
	position: Scriptable<TooltipPositioner, ScriptableTooltipContext<TType>>;

	/**
	 * Override the tooltip alignment calculations
	 */
	xAlign: Scriptable<TooltipXAlignment, ScriptableTooltipContext<TType>>;
	yAlign: Scriptable<TooltipYAlignment, ScriptableTooltipContext<TType>>;

	/**
	 * Sort tooltip items.
	 */
	itemSort: (
		a: TooltipItem<TType>,
		b: TooltipItem<TType>,
		data: ChartData
	) => number;

	filter: (
		e: TooltipItem<TType>,
		index: number,
		array: TooltipItem<TType>[],
		data: ChartData
	) => boolean;

	/**
	 * Background color of the tooltip.
	 * @default 'rgba(0, 0, 0, 0.8)'
	 */
	backgroundColor: Scriptable<Color, ScriptableTooltipContext<TType>>;
	/**
	 * Padding between the color box and the text.
	 * @default 1
	 */
	boxPadding: number;
	/**
	 * Color of title
	 * @default '#fff'
	 */
	titleColor: Scriptable<Color, ScriptableTooltipContext<TType>>;
	/**
	 * See Fonts
	 * @default {weight: 'bold'}
	 */
	titleFont: Scriptable<FontSpec, ScriptableTooltipContext<TType>>;
	/**
	 * Spacing to add to top and bottom of each title line.
	 * @default 2
	 */
	titleSpacing: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Margin to add on bottom of title section.
	 * @default 6
	 */
	titleMarginBottom: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Horizontal alignment of the title text lines.
	 * @default 'left'
	 */
	titleAlign: Scriptable<TextAlign, ScriptableTooltipContext<TType>>;
	/**
	 * Spacing to add to top and bottom of each tooltip item.
	 * @default 2
	 */
	bodySpacing: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Color of body
	 * @default '#fff'
	 */
	bodyColor: Scriptable<Color, ScriptableTooltipContext<TType>>;
	/**
	 * See Fonts.
	 * @default {}
	 */
	bodyFont: Scriptable<FontSpec, ScriptableTooltipContext<TType>>;
	/**
	 * Horizontal alignment of the body text lines.
	 * @default 'left'
	 */
	bodyAlign: Scriptable<TextAlign, ScriptableTooltipContext<TType>>;
	/**
	 * Spacing to add to top and bottom of each footer line.
	 * @default 2
	 */
	footerSpacing: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Margin to add before drawing the footer.
	 * @default 6
	 */
	footerMarginTop: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Color of footer
	 * @default '#fff'
	 */
	footerColor: Scriptable<Color, ScriptableTooltipContext<TType>>;
	/**
	 * See Fonts
	 * @default {weight: 'bold'}
	 */
	footerFont: Scriptable<FontSpec, ScriptableTooltipContext<TType>>;
	/**
	 * Horizontal alignment of the footer text lines.
	 * @default 'left'
	 */
	footerAlign: Scriptable<TextAlign, ScriptableTooltipContext<TType>>;
	/**
	 * Padding to add to the tooltip
	 * @default 6
	 */
	padding: Scriptable<number | ChartArea, ScriptableTooltipContext<TType>>;
	/**
	 * Extra distance to move the end of the tooltip arrow away from the tooltip point.
	 * @default 2
	 */
	caretPadding: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Size, in px, of the tooltip arrow.
	 * @default 5
	 */
	caretSize: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Radius of tooltip corner curves.
	 * @default 6
	 */
	cornerRadius: Scriptable<
		number | BorderRadius,
		ScriptableTooltipContext<TType>
	>;
	/**
	 * Color to draw behind the colored boxes when multiple items are in the tooltip.
	 * @default '#fff'
	 */
	multiKeyBackground: Scriptable<Color, ScriptableTooltipContext<TType>>;
	/**
	 * If true, color boxes are shown in the tooltip.
	 * @default true
	 */
	displayColors: Scriptable<boolean, ScriptableTooltipContext<TType>>;
	/**
	 * Width of the color box if displayColors is true.
	 * @default bodyFont.size
	 */
	boxWidth: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Height of the color box if displayColors is true.
	 * @default bodyFont.size
	 */
	boxHeight: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * Use the corresponding point style (from dataset options) instead of color boxes, ex: star, triangle etc. (size is based on the minimum value between boxWidth and boxHeight)
	 * @default false
	 */
	usePointStyle: Scriptable<boolean, ScriptableTooltipContext<TType>>;
	/**
	 * Color of the border.
	 * @default 'rgba(0, 0, 0, 0)'
	 */
	borderColor: Scriptable<Color, ScriptableTooltipContext<TType>>;
	/**
	 * Size of the border.
	 * @default 0
	 */
	borderWidth: Scriptable<number, ScriptableTooltipContext<TType>>;
	/**
	 * true for rendering the legends from right to left.
	 */
	rtl: Scriptable<boolean, ScriptableTooltipContext<TType>>;

	/**
	 * This will force the text direction 'rtl' or 'ltr on the canvas for rendering the tooltips, regardless of the css specified on the canvas
	 * @default canvas's default
	 */
	textDirection: Scriptable<string, ScriptableTooltipContext<TType>>;

	animation: AnimationSpec<TType>;
	animations: AnimationsSpec<TType>;
	callbacks: TooltipCallbacks<TType>;
}

export interface TooltipItem<TType extends ChartType> {
	/**
	 * The chart the tooltip is being shown on
	 */
	chart: Chart;

	/**
	 * Label for the tooltip
	 */
	label: string;

	/**
	 * Parsed data values for the given `dataIndex` and `datasetIndex`
	 */
	parsed: UnionToIntersection<ParsedDataType<TType>>;

	/**
	 * Raw data values for the given `dataIndex` and `datasetIndex`
	 */
	raw: unknown;

	/**
	 * Formatted value for the tooltip
	 */
	formattedValue: string;

	/**
	 * The dataset the item comes from
	 */
	dataset: UnionToIntersection<ChartDataset<TType>>;

	/**
	 * Index of the dataset the item comes from
	 */
	datasetIndex: number;

	/**
	 * Index of this data item in the dataset
	 */
	dataIndex: number;

	/**
	 * The chart element (point, arc, bar, etc.) for this tooltip item
	 */
	element: Element;
}

export interface PluginOptionsByType<TType extends ChartType> {
	decimation: DecimationOptions;
	filler: FillerOptions;
	legend: LegendOptions<TType>;
	subtitle: TitleOptions;
	title: TitleOptions;
	tooltip: TooltipOptions<TType>;
}
export interface PluginChartOptions<TType extends ChartType> {
	plugins: PluginOptionsByType<TType>;
}

export interface GridLineOptions {
	/**
	 * @default true
	 */
	display: boolean;
	borderColor: Color;
	borderWidth: number;
	/**
	 * @default false
	 */
	circular: boolean;
	/**
	 * @default 'rgba(0, 0, 0, 0.1)'
	 */
	color: Scriptable<Color, ScriptableScaleContext> | readonly Color[];
	/**
	 * @default []
	 */
	borderDash: number[];
	/**
	 * @default 0
	 */
	borderDashOffset: Scriptable<number, ScriptableScaleContext>;
	/**
	 * @default 1
	 */
	lineWidth: Scriptable<number, ScriptableScaleContext> | readonly number[];

	/**
	 * @default true
	 */
	drawBorder: boolean;
	/**
	 * @default true
	 */
	drawOnChartArea: boolean;
	/**
	 * @default true
	 */
	drawTicks: boolean;
	/**
	 * @default []
	 */
	tickBorderDash: number[];
	/**
	 * @default 0
	 */
	tickBorderDashOffset: Scriptable<number, ScriptableScaleContext>;
	/**
	 * @default 'rgba(0, 0, 0, 0.1)'
	 */
	tickColor: Scriptable<Color, ScriptableScaleContext> | readonly Color[];
	/**
	 * @default 10
	 */
	tickLength: number;
	/**
	 * @default 1
	 */
	tickWidth: number;
	/**
	 * @default false
	 */
	offset: boolean;
	/**
	 * @default 0
	 */
	z: number;
}

export interface TickOptions {
	/**
	 * Color of label backdrops.
	 * @default 'rgba(255, 255, 255, 0.75)'
	 */
	backdropColor: Scriptable<Color, ScriptableScaleContext>;
	/**
	 * Padding of tick backdrop.
	 * @default 2
	 */
	backdropPadding: number | ChartArea;

	/**
	 * Returns the string representation of the tick value as it should be displayed on the chart. See callback.
	 */
	callback: (
		this: Scale,
		tickValue: number | string,
		index: number,
		ticks: Tick[]
	) => string | string[] | number | number[] | null | undefined;
	/**
	 * If true, show tick labels.
	 * @default true
	 */
	display: boolean;
	/**
	 * Color of tick
	 * @see Defaults.color
	 */
	color: Scriptable<Color, ScriptableScaleContext>;
	/**
	 * see Fonts
	 */
	font: Scriptable<FontSpec, ScriptableScaleContext>;
	/**
	 * Sets the offset of the tick labels from the axis
	 */
	padding: number;
	/**
	 * If true, draw a background behind the tick labels.
	 * @default false
	 */
	showLabelBackdrop: Scriptable<boolean, ScriptableScaleContext>;
	/**
	 * The color of the stroke around the text.
	 * @default undefined
	 */
	textStrokeColor: Scriptable<Color, ScriptableScaleContext>;
	/**
	 * Stroke width around the text.
	 * @default 0
	 */
	textStrokeWidth: Scriptable<number, ScriptableScaleContext>;
	/**
	 * z-index of tick layer. Useful when ticks are drawn on chart area. Values <= 0 are drawn under datasets, > 0 on top.
	 * @default 0
	 */
	z: number;

	major: {
		/**
		 * If true, major ticks are generated. A major tick will affect autoskipping and major will be defined on ticks in the scriptable options context.
		 * @default false
		 */
		enabled: boolean;
	};
}

export interface CartesianScaleOptions extends CoreScaleOptions {
	/**
	 * Scale boundary strategy (bypassed by min/max time options)
	 * - `data`: make sure data are fully visible, ticks outside are removed
	 * - `ticks`: make sure ticks are fully visible, data outside are truncated
	 * @since 2.7.0
	 * @default 'ticks'
	 */
	bounds: 'ticks' | 'data';

	/**
	 * Position of the axis.
	 */
	position:
		| 'left'
		| 'top'
		| 'right'
		| 'bottom'
		| 'center'
		| { [scale: string]: number };

	/**
	 * Stack group. Axes at the same `position` with same `stack` are stacked.
	 */
	stack?: string;

	/**
	 * Weight of the scale in stack group. Used to determine the amount of allocated space for the scale within the group.
	 * @default 1
	 */
	stackWeight?: number;

	/**
	 *   Which type of axis this is. Possible values are: 'x', 'y'. If not set, this is inferred from the first character of the ID which should be 'x' or 'y'.
	 */
	axis: 'x' | 'y';

	/**
	 * User defined minimum value for the scale, overrides minimum value from data.
	 */
	min: number;

	/**
	 * User defined maximum value for the scale, overrides maximum value from data.
	 */
	max: number;

	/**
	 *   If true, extra space is added to the both edges and the axis is scaled to fit into the chart area. This is set to true for a bar chart by default.
	 * @default false
	 */
	offset: boolean;

	grid: GridLineOptions;

	/** Options for the scale title. */
	title: {
		/** If true, displays the axis title. */
		display: boolean;
		/** Alignment of the axis title. */
		align: 'start' | 'center' | 'end';
		/** The text for the title, e.g. "# of People" or "Response Choices". */
		text: string | string[];
		/** Color of the axis label. */
		color: Color;
		/** Information about the axis title font. */
		font: FontSpec;
		/** Padding to apply around scale labels. */
		padding:
			| number
			| {
					/** Padding on the (relative) top side of this axis label. */
					top: number;
					/** Padding on the (relative) bottom side of this axis label. */
					bottom: number;
					/** This is a shorthand for defining top/bottom to the same values. */
					y: number;
			  };
	};

	/**
	 *   If true, data will be comprised between datasets of data
	 * @default false
	 */
	stacked?: boolean | 'single';

	ticks: TickOptions & {
		/**
		 * The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
		 * @default ticks.length
		 */
		sampleSize: number;
		/**
		 * The label alignment
		 * @default 'center'
		 */
		align: 'start' | 'center' | 'end';
		/**
		 *   If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to maxRotation before skipping any. Turn autoSkip off to show all labels no matter what.
		 * @default true
		 */
		autoSkip: boolean;
		/**
		 * Padding between the ticks on the horizontal axis when autoSkip is enabled.
		 * @default 0
		 */
		autoSkipPadding: number;

		/**
		 * How is the label positioned perpendicular to the axis direction.
		 * This only applies when the rotation is 0 and the axis position is one of "top", "left", "right", or "bottom"
		 * @default 'near'
		 */
		crossAlign: 'near' | 'center' | 'far';

		/**
		 * Should the defined `min` and `max` values be presented as ticks even if they are not "nice".
		 * @default: true
		 */
		includeBounds: boolean;

		/**
		 * Distance in pixels to offset the label from the centre point of the tick (in the x direction for the x axis, and the y direction for the y axis). Note: this can cause labels at the edges to be cropped by the edge of the canvas
		 * @default 0
		 */
		labelOffset: number;

		/**
		 * Minimum rotation for tick labels. Note: Only applicable to horizontal scales.
		 * @default 0
		 */
		minRotation: number;
		/**
		 * Maximum rotation for tick labels when rotating to condense labels. Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.
		 * @default 50
		 */
		maxRotation: number;
		/**
		 * Flips tick labels around axis, displaying the labels inside the chart instead of outside. Note: Only applicable to vertical scales.
		 * @default false
		 */
		mirror: boolean;
		/**
		 *   Padding between the tick label and the axis. When set on a vertical axis, this applies in the horizontal (X) direction. When set on a horizontal axis, this applies in the vertical (Y) direction.
		 * @default 0
		 */
		padding: number;
	};
}

export type CategoryScaleOptions = CartesianScaleOptions & {
	min: string | number;
	max: string | number;
	labels: string[] | string[][];
};

export interface CategoryScale extends ChartComponent {
	new (cfg: AnyObject): CategoryScale;
}

export type LinearScaleOptions = CartesianScaleOptions & {
	/**
	 *  if true, scale will include 0 if it is not already included.
	 * @default true
	 */
	beginAtZero: boolean;

	/**
	 * Adjustment used when calculating the maximum data value.
	 */
	suggestedMin?: number;
	/**
	 * Adjustment used when calculating the minimum data value.
	 */
	suggestedMax?: number;
	/**
	 * Percentage (string ending with %) or amount (number) for added room in the scale range above and below data.
	 */
	grace?: string | number;

	ticks: {
		/**
		 * The Intl.NumberFormat options used by the default label formatter
		 */
		format: Intl.NumberFormatOptions;

		/**
		 * Maximum number of ticks and gridlines to show.
		 * @default 11
		 */
		maxTicksLimit: number;
		/**
		 * if defined and stepSize is not specified, the step size will be rounded to this many decimal places.
		 */
		precision: number;

		/**
		 * User defined fixed step size for the scale
		 */
		stepSize: number;

		/**
		 * User defined count of ticks
		 */
		count: number;
	};
};

export interface LinearScale extends ChartComponent {
	new (cfg: AnyObject): LinearScale;
}

export type LogarithmicScaleOptions = CartesianScaleOptions & {
	/**
	 * Adjustment used when calculating the maximum data value.
	 */
	suggestedMin?: number;
	/**
	 * Adjustment used when calculating the minimum data value.
	 */
	suggestedMax?: number;

	ticks: {
		/**
		 * The Intl.NumberFormat options used by the default label formatter
		 */
		format: Intl.NumberFormatOptions;
	};
};

export interface LogarithmicScale extends ChartComponent {
	new (cfg: AnyObject): LogarithmicScale;
}

export type TimeScaleOptions = CartesianScaleOptions & {
	min: string | number;
	max: string | number;

	suggestedMin: string | number;
	suggestedMax: string | number;
	/**
	 * Scale boundary strategy (bypassed by min/max time options)
	 * - `data`: make sure data are fully visible, ticks outside are removed
	 * - `ticks`: make sure ticks are fully visible, data outside are truncated
	 * @since 2.7.0
	 * @default 'data'
	 */
	bounds: 'ticks' | 'data';

	/**
	 * options for creating a new adapter instance
	 */
	adapters: {
		date: unknown;
	};

	time: {
		/**
		 * Custom parser for dates.
		 */
		parser: string | ((v: unknown) => number);
		/**
		 * If defined, dates will be rounded to the start of this unit. See Time Units below for the allowed units.
		 */
		round: false | TimeUnit;
		/**
		 * If boolean and true and the unit is set to 'week', then the first day of the week will be Monday. Otherwise, it will be Sunday.
		 * If `number`, the index of the first day of the week (0 - Sunday, 6 - Saturday).
		 * @default false
		 */
		isoWeekday: boolean | number;
		/**
		 * Sets how different time units are displayed.
		 */
		displayFormats: {
			[key: string]: string;
		};
		/**
		 * The format string to use for the tooltip.
		 */
		tooltipFormat: string;
		/**
		 * If defined, will force the unit to be a certain type. See Time Units section below for details.
		 * @default false
		 */
		unit: false | TimeUnit;

		/**
		 * The number of units between grid lines.
		 * @default 1
		 */
		stepSize: number;
		/**
		 * The minimum display format to be used for a time unit.
		 * @default 'millisecond'
		 */
		minUnit: TimeUnit;
	};

	ticks: {
		/**
		 * Ticks generation input values:
		 * - 'auto': generates "optimal" ticks based on scale size and time options.
		 * - 'data': generates ticks from data (including labels from data {t|x|y} objects).
		 * - 'labels': generates ticks from user given `data.labels` values ONLY.
		 * @see https://github.com/chartjs/Chart.js/pull/4507
		 * @since 2.7.0
		 * @default 'auto'
		 */
		source: 'labels' | 'auto' | 'data';
	};
};

export interface TimeScale extends ChartComponent {
	new (cfg: AnyObject): TimeScale;
	getDataTimestamps(): number[];
	getLabelTimestamps(): string[];
	normalize(values: number[]): number[];
}

export interface TimeSeriesScale extends ChartComponent {
	new (cfg: AnyObject): TimeSeriesScale;
}

export type RadialLinearScaleOptions = CoreScaleOptions & {
	animate: boolean;

	angleLines: {
		/**
		 * if true, angle lines are shown.
		 * @default true
		 */
		display: boolean;
		/**
		 * Color of angled lines.
		 * @default 'rgba(0, 0, 0, 0.1)'
		 */
		color: Scriptable<Color, ScriptableScaleContext>;
		/**
		 * Width of angled lines.
		 * @default 1
		 */
		lineWidth: Scriptable<number, ScriptableScaleContext>;
		/**
		 * Length and spacing of dashes on angled lines. See MDN.
		 * @default []
		 */
		borderDash: Scriptable<number[], ScriptableScaleContext>;
		/**
		 * Offset for line dashes. See MDN.
		 * @default 0
		 */
		borderDashOffset: Scriptable<number, ScriptableScaleContext>;
	};

	/**
	 * if true, scale will include 0 if it is not already included.
	 * @default false
	 */
	beginAtZero: boolean;

	grid: GridLineOptions;

	/**
	 * User defined minimum number for the scale, overrides minimum value from data.
	 */
	min: number;
	/**
	 * User defined maximum number for the scale, overrides maximum value from data.
	 */
	max: number;

	pointLabels: {
		/**
		 * Background color of the point label.
		 * @default undefined
		 */
		backdropColor: Scriptable<Color, ScriptableScalePointLabelContext>;
		/**
		 * Padding of label backdrop.
		 * @default 2
		 */
		backdropPadding: Scriptable<
			number | ChartArea,
			ScriptableScalePointLabelContext
		>;

		/**
		 * if true, point labels are shown.
		 * @default true
		 */
		display: boolean;
		/**
		 * Color of label
		 * @see Defaults.color
		 */
		color: Scriptable<Color, ScriptableScalePointLabelContext>;
		/**
		 */
		font: Scriptable<FontSpec, ScriptableScalePointLabelContext>;

		/**
		 * Callback function to transform data labels to point labels. The default implementation simply returns the current string.
		 */
		callback: (
			label: string,
			index: number
		) => string | string[] | number | number[];

		/**
		 * if true, point labels are centered.
		 * @default false
		 */
		centerPointLabels: boolean;
	};

	/**
	 * Adjustment used when calculating the maximum data value.
	 */
	suggestedMax: number;
	/**
	 * Adjustment used when calculating the minimum data value.
	 */
	suggestedMin: number;

	ticks: TickOptions & {
		/**
		 * The Intl.NumberFormat options used by the default label formatter
		 */
		format: Intl.NumberFormatOptions;

		/**
		 * Maximum number of ticks and gridlines to show.
		 * @default 11
		 */
		maxTicksLimit: number;

		/**
		 * if defined and stepSize is not specified, the step size will be rounded to this many decimal places.
		 */
		precision: number;

		/**
		 * User defined fixed step size for the scale.
		 */
		stepSize: number;

		/**
		 * User defined number of ticks
		 */
		count: number;
	};
};

export interface RadialLinearScale extends ChartComponent {
	new (cfg: AnyObject): RadialLinearScale;

	setCenterPoint(
		leftMovement: number,
		rightMovement: number,
		topMovement: number,
		bottomMovement: number
	): void;
	getIndexAngle(index: number): number;
	getDistanceFromCenterForValue(value: number): number;
	getValueForDistanceFromCenter(distance: number): number;
	getPointPosition(
		index: number,
		distanceFromCenter: number
	): { x: number; y: number; angle: number };
	getPointPositionForValue(
		index: number,
		value: number
	): { x: number; y: number; angle: number };
	getPointLabelPosition(index: number): ChartArea;
	getBasePosition(index: number): { x: number; y: number; angle: number };
}

export interface CartesianScaleTypeRegistry {
	linear: {
		options: LinearScaleOptions;
	};
	logarithmic: {
		options: LogarithmicScaleOptions;
	};
	category: {
		options: CategoryScaleOptions;
	};
	time: {
		options: TimeScaleOptions;
	};
	timeseries: {
		options: TimeScaleOptions;
	};
}

export interface RadialScaleTypeRegistry {
	radialLinear: {
		options: RadialLinearScaleOptions;
	};
}

export interface ScaleTypeRegistry
	extends CartesianScaleTypeRegistry,
		RadialScaleTypeRegistry {}

export type ScaleType = keyof ScaleTypeRegistry;

interface CartesianParsedData {
	x: number;
	y: number;

	// Only specified when stacked bars are enabled
	_stacks?: {
		// Key is the stack ID which is generally the axis ID
		[key: string]: {
			// Inner key is the datasetIndex
			[key: number]: number;
		};
	};
}

interface BarParsedData extends CartesianParsedData {
	// Only specified if floating bars are show
	_custom?: {
		barStart: number;
		barEnd: number;
		start: number;
		end: number;
		min: number;
		max: number;
	};
}

interface BubbleParsedData extends CartesianParsedData {
	// The bubble radius value
	_custom: number;
}

interface RadialParsedData {
	r: number;
}

export interface ChartTypeRegistry {
	bar: {
		chartOptions: BarControllerChartOptions;
		datasetOptions: BarControllerDatasetOptions;
		defaultDataPoint: number;
		metaExtensions: {};
		parsedDataType: BarParsedData;
		scales: keyof CartesianScaleTypeRegistry;
	};
	line: {
		chartOptions: LineControllerChartOptions;
		datasetOptions: LineControllerDatasetOptions &
			FillerControllerDatasetOptions;
		defaultDataPoint: ScatterDataPoint | number | null;
		metaExtensions: {};
		parsedDataType: CartesianParsedData;
		scales: keyof CartesianScaleTypeRegistry;
	};
	scatter: {
		chartOptions: ScatterControllerChartOptions;
		datasetOptions: ScatterControllerDatasetOptions;
		defaultDataPoint: ScatterDataPoint | number | null;
		metaExtensions: {};
		parsedDataType: CartesianParsedData;
		scales: keyof CartesianScaleTypeRegistry;
	};
	bubble: {
		chartOptions: unknown;
		datasetOptions: BubbleControllerDatasetOptions;
		defaultDataPoint: BubbleDataPoint;
		metaExtensions: {};
		parsedDataType: BubbleParsedData;
		scales: keyof CartesianScaleTypeRegistry;
	};
	pie: {
		chartOptions: PieControllerChartOptions;
		datasetOptions: PieControllerDatasetOptions;
		defaultDataPoint: PieDataPoint;
		metaExtensions: PieMetaExtensions;
		parsedDataType: number;
		scales: keyof CartesianScaleTypeRegistry;
	};
	doughnut: {
		chartOptions: DoughnutControllerChartOptions;
		datasetOptions: DoughnutControllerDatasetOptions;
		defaultDataPoint: DoughnutDataPoint;
		metaExtensions: DoughnutMetaExtensions;
		parsedDataType: number;
		scales: keyof CartesianScaleTypeRegistry;
	};
	polarArea: {
		chartOptions: PolarAreaControllerChartOptions;
		datasetOptions: PolarAreaControllerDatasetOptions;
		defaultDataPoint: number;
		metaExtensions: {};
		parsedDataType: RadialParsedData;
		scales: keyof RadialScaleTypeRegistry;
	};
	radar: {
		chartOptions: RadarControllerChartOptions;
		datasetOptions: RadarControllerDatasetOptions &
			FillerControllerDatasetOptions;
		defaultDataPoint: number | null;
		metaExtensions: {};
		parsedDataType: RadialParsedData;
		scales: keyof RadialScaleTypeRegistry;
	};
}

export type ChartType = keyof ChartTypeRegistry;

export type ScaleOptionsByType<TScale extends ScaleType = ScaleType> = {
	[key in ScaleType]: { type: key } & ScaleTypeRegistry[key]['options'];
}[TScale];

// Convenience alias for creating and manipulating scale options in user code
export type ScaleOptions<TScale extends ScaleType = ScaleType> = DeepPartial<
	ScaleOptionsByType<TScale>
>;

export type DatasetChartOptions<TType extends ChartType = ChartType> = {
	[key in TType]: {
		datasets: ChartTypeRegistry[key]['datasetOptions'];
	};
};

export type ScaleChartOptions<TType extends ChartType = ChartType> = {
	scales: {
		[key: string]: ScaleOptionsByType<ChartTypeRegistry[TType]['scales']>;
	};
};

export type ChartOptions<TType extends ChartType = ChartType> = DeepPartial<
	CoreChartOptions<TType> &
		ElementChartOptions<TType> &
		PluginChartOptions<TType> &
		DatasetChartOptions<TType> &
		ScaleChartOptions<TType> &
		ChartTypeRegistry[TType]['chartOptions']
>;

export type DefaultDataPoint<TType extends ChartType> = DistributiveArray<
	ChartTypeRegistry[TType]['defaultDataPoint']
>;

export type ParsedDataType<TType extends ChartType = ChartType> =
	ChartTypeRegistry[TType]['parsedDataType'];

export interface ChartDatasetProperties<TType extends ChartType, TData> {
	type?: TType;
	data: TData;
}

export type ChartDataset<
	TType extends ChartType = ChartType,
	TData = DefaultDataPoint<TType>
> = DeepPartial<
	{
		[key in ChartType]: {
			type: key;
		} & ChartTypeRegistry[key]['datasetOptions'];
	}[TType]
> &
	ChartDatasetProperties<TType, TData>;

/**
 * TData represents the data point type. If unspecified, a default is provided
 *   based on the chart type.
 * TLabel represents the label type
 */
export interface ChartData<
	TType extends ChartType = ChartType,
	TData = DefaultDataPoint<TType>,
	TLabel = unknown
> {
	labels?: TLabel[];
	datasets: ChartDataset<TType, TData>[];
}

export interface ChartConfiguration<
	TType extends ChartType = ChartType,
	TData = DefaultDataPoint<TType>,
	TLabel = unknown
> {
	type: TType;
	data: ChartData<TType, TData, TLabel>;
	options?: ChartOptions<TType>;
	plugins?: Plugin<TType>[];
}
