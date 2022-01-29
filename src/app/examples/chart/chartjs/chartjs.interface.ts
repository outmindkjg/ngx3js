import { ChartAction, ChartSharedVar } from '../chart-utils';

export type ChartType =
	| 'bar'
	| 'line'
	| 'scatter'
	| 'bubble'
	| 'pie'
	| 'doughnut'
	| 'polarArea'
	| 'radar'
	| string;

export interface Chart {
	readonly platform?: BasePlatform;
	readonly id?: string;
	readonly canvas?: HTMLCanvasElement;
	readonly ctx?: CanvasRenderingContext2D;
	readonly config?: ChartConfiguration;
	readonly width?: number;
	readonly height?: number;
	readonly aspectRatio?: number;
	readonly boxes?: LayoutItem[];
	readonly currentDevicePixelRatio?: number;
	readonly chartArea?: ChartArea;
	readonly scales?: { [key: string]: ScaleOptions };
	readonly attached?: boolean;

	readonly tooltip?: any; // Only available if tooltip plugin is registered and enabled

	data?: ChartData;
	options?: ChartOptions;

	constructor(item?: ChartItem, config?: ChartConfiguration);

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
		e?: Event,
		mode?: string,
		options?: InteractionOptions,
		useFinalPosition?: boolean
	): InteractionItem[];

	getSortedVisibleDatasetMetas(): any[];
	getDatasetMeta(datasetIndex?: number): any;
	getVisibleDatasetCount(): number;
	isDatasetVisible(datasetIndex?: number): boolean;
	setDatasetVisibility(datasetIndex?: number, visible?: boolean): void;
	toggleDataVisibility(index?: number): void;
	getDataVisibility(index?: number): boolean;
	hide(datasetIndex?: number, dataIndex?: number): void;
	show(datasetIndex?: number, dataIndex?: number): void;

	getActiveElements(): ActiveElement[];
	setActiveElements(active?: ActiveDataPoint[]): void;

	destroy(): void;
	toBase64Image(type?: string, quality?: unknown): string;
	bindEvents(): void;
	unbindEvents(): void;
	updateHoverStyle(items?: Element, mode?: 'dataset', enabled?: boolean): void;

	notifyPlugins(hook?: string, args?: AnyObject): boolean | void;

	readonly defaults?: any;
	readonly version?: string;
	readonly instances?: { [key: string]: Chart };
	readonly registry?: any;
	getChart(
		key?: string | CanvasRenderingContext2D | HTMLCanvasElement
	): Chart | undefined;
	register(...items: any[]): void;
	unregister(...items: any[]): void;
}

export declare type ChartItem =
	| string
	| CanvasRenderingContext2D
	| HTMLCanvasElement
	| { canvas?: HTMLCanvasElement }
	| ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>;

export interface TooltipModel {
	readonly chart?: Chart;

	// The items that we are rendering in the tooltip. See Tooltip Item Interface section
	dataPoints?: any[];

	// Positioning
	xAlign?: TooltipXAlignment;
	yAlign?: TooltipYAlignment;

	// X and Y properties are the top left of the tooltip
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	// Where the tooltip points to
	caretX?: number;
	caretY?: number;

	// Body
	// The body lines that need to be rendered
	// Each object contains 3 parameters
	// before?: string[] // lines of text before the line with the color square
	// lines?: string[]; // lines of text to render as the main item with color square
	// after?: string[]; // lines of text to render after the main lines
	body?: { before?: string[]; lines?: string[]; after?: string[] }[];
	// lines of text that appear after the title but before the body
	beforeBody?: string[];
	// line of text that appear after the body and before the footer
	afterBody?: string[];

	// Title
	// lines of text that form the title
	title?: string[];

	// Footer
	// lines of text that form the footer
	footer?: string[];

	// Styles to render for each item in body[]. This is the styling of the squares in the tooltip
	labelColors?: any[];
	labelTextColors?: Color[];
	labelPointStyles?: { pointStyle?: any; rotation?: number }[];

	// 0 opacity is a hidden tooltip
	opacity?: number;

	// tooltip options
	options?: any;

	getActiveElements(): ActiveElement[];
	setActiveElements(active?: ActiveDataPoint[], eventPosition?: Point): void;
}

export type TooltipXAlignment = 'left' | 'center' | 'right';
export type TooltipYAlignment = 'top' | 'center' | 'bottom';

export interface Point {
	x?: number;
	y?: number;
}

export interface TooltipItem {
	/**
	 * The chart the tooltip is being shown on
	 */
	chart?: Chart;

	/**
	 * Label for the tooltip
	 */
	label?: string;

	/**
	 * Parsed data values for the given `dataIndex` and `datasetIndex`
	 */
	parsed?: any;

	/**
	 * Raw data values for the given `dataIndex` and `datasetIndex`
	 */
	raw?: unknown;

	/**
	 * Formatted value for the tooltip
	 */
	formattedValue?: string;

	/**
	 * The dataset the item comes from
	 */
	dataset?: any;

	/**
	 * Index of the dataset the item comes from
	 */
	datasetIndex?: number;

	/**
	 * Index of this data item in the dataset
	 */
	dataIndex?: number;

	/**
	 * The chart element (point, arc, bar, etc.) for this tooltip item
	 */
	element?: Element;
}

export interface InteractionOptions {
	axis?: string;
	intersect?: boolean;
}

export interface InteractionItem {
	element?: Element;
	datasetIndex?: number;
	index?: number;
}

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

export interface ActiveDataPoint {
	datasetIndex?: number;
	index?: number;
}

export interface ActiveElement extends ActiveDataPoint {
	element?: Element;
}

export interface BasePlatform {
	/**
	 * Called at chart construction time, returns a context2d instance implementing
	 * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
	 * @param {HTMLCanvasElement} canvas - The canvas from which to acquire context (platform specific)
	 * @param options - The chart options
	 */
	acquireContext(
		canvas?: HTMLCanvasElement,
		options?: CanvasRenderingContext2DSettings
	): CanvasRenderingContext2D | null;
	/**
	 * Called at chart destruction time, releases any resources associated to the context
	 * previously returned by the acquireContext() method.
	 * @param {CanvasRenderingContext2D} context - The context2d instance
	 * @returns {boolean} true if the method succeeded, else false
	 */
	releaseContext(context?: CanvasRenderingContext2D): boolean;
	/**
	 * Registers the specified listener on the given chart.
	 * @param {Chart} chart - Chart from which to listen for event
	 * @param {string} type - The ({@link ChartEvent}) type to listen for
	 * @param listener - Receives a notification (an object that implements
	 * the {@link ChartEvent} interface) when an event of the specified type occurs.
	 */
	addEventListener(
		chart?: Chart,
		type?: string,
		listener?: (e?: ChartEvent) => void
	): void;
	/**
	 * Removes the specified listener previously registered with addEventListener.
	 * @param {Chart} chart - Chart from which to remove the listener
	 * @param {string} type - The ({@link ChartEvent}) type to remove
	 * @param listener - The listener function to remove from the event target.
	 */
	removeEventListener(
		chart?: Chart,
		type?: string,
		listener?: (e?: ChartEvent) => void
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
	 * @returns { width?: number, height?: number } the maximum size available.
	 */
	getMaximumSize(
		canvas?: HTMLCanvasElement,
		width?: number,
		height?: number,
		aspectRatio?: number
	): { width?: number; height?: number };
	/**
	 * @param {HTMLCanvasElement} canvas
	 * @returns {boolean} true if the canvas is attached to the platform, false if not.
	 */
	isAttached(canvas?: HTMLCanvasElement): boolean;
	/**
	 * Updates config with platform specific requirements
	 * @param {ChartConfiguration} config
	 */
	updateConfig(config?: ChartConfiguration): void;
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
	native?: Event | null;
	x?: number | null;
	y?: number | null;
}

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
	position?: LayoutPosition;
	/**
	 * The weight used to sort the item. Higher weights are further away from the chart area
	 */
	weight?: number;
	/**
	 * if true, and the item is horizontal, then push vertical boxes down
	 */
	fullSize?: boolean;
	/**
	 * Width of item. Must be valid after update()
	 */
	width?: number;
	/**
	 * Height of item. Must be valid after update()
	 */
	height?: number;
	/**
	 * Left edge of the item. Set by layout system and cannot be used in update
	 */
	left?: number;
	/**
	 * Top edge of the item. Set by layout system and cannot be used in update
	 */
	top?: number;
	/**
	 * Right edge of the item. Set by layout system and cannot be used in update
	 */
	right?: number;
	/**
	 * Bottom edge of the item. Set by layout system and cannot be used in update
	 */
	bottom?: number;

	/**
	 * Called before the layout process starts
	 */
	beforeLayout?(): void;
	/**
	 * Draws the element
	 */
	draw(chartArea?: ChartArea): void;
	/**
	 * Returns an object with padding on the edges
	 */
	getPadding?(): ChartArea;
	/**
	 * returns true if the layout item is horizontal (ie. top or bottom)
	 */
	isHorizontal(): boolean;
	/**
	 * Takes two parameters?: width and height.
	 * @param width
	 * @param height
	 */
	update(width?: number, height?: number, margins?: ChartArea): void;
}

export interface ChartConfiguration {
	/**
	 * Chart Type
	 * bar, line, scatter, bubble, pie, doughnut, polarArea, radar
	 */
	type?: ChartType;

	/**
	 * Chart Configuration URL
	 */
	url?: string;

	/**
	 * TData represents the data point type. If unspecified, a default is provided
	 *   based on the chart type.
	 * TLabel represents the label type
	 */
	data?: ChartData;

	/**
	 * Chart Options
	 */
	options?: ChartOptions;

	/**
	 * Plugin
	 */
	plugins?: Plugin[];

	/**
	 * Chart Shared Var
	 */
	sharedVar?: ChartSharedVar;

	/**
	 * ChartActions
	 */
	actions?: ChartAction[];
}

/**
 * @param {Chart} chart - The chart instance.
 * @param {object} args - The call arguments.
 * @param {object} options - The plugin options.
 */
export type ScriptableFunction<T = void> =
	| ((chart?: any, args?: any, options?: any) => T)
	| string;

export interface Plugin {
	id?: string;

	/**
	 * @desc Called when plugin is installed for this chart instance. This hook is also invoked for disabled plugins (options === false).
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since 3.0.0
	 */
	install?: ScriptableFunction;
	/**
	 * @desc Called when a plugin is starting. This happens when chart is created or plugin is enabled.
	 * @since 3.0.0
	 */
	start?: ScriptableFunction;
	/**
	 * @desc Called when a plugin stopping. This happens when chart is destroyed or plugin is disabled.
	 * @since 3.0.0
	 */
	stop?: ScriptableFunction;

	/**
	 * @desc Called before initializing `chart`.
	 */
	beforeInit?: ScriptableFunction;
	/**
	 * @desc Called after `chart` has been initialized and before the first update.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterInit?: ScriptableFunction;
	/**
	 * @desc Called before updating `chart`. If any plugin returns `false`, the update
	 * is cancelled (and thus subsequent render(s)) until another `update` is triggered.
	 * @returns {boolean} `false` to cancel the chart update.
	 */
	beforeUpdate?: ScriptableFunction<boolean | void>;
	/**
	 * @desc Called after `chart` has been updated and before rendering. Note that this
	 * hook will not be called if the chart update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {UpdateMode} args.mode - The update mode
	 * @param {object} options - The plugin options.
	 */
	afterUpdate?: ScriptableFunction;
	/**
	 * @desc Called during the update process, before any chart elements have been created.
	 * This can be used for data decimation by changing the data array inside a dataset.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	beforeElementsUpdate?: ScriptableFunction;
	/**
	 * @desc Called during chart reset
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since version 3.0.0
	 */
	reset?: ScriptableFunction;
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
	beforeDatasetsUpdate?: ScriptableFunction<boolean | void>;
	/**
	 * @desc Called after the `chart` datasets have been updated. Note that this hook
	 * will not be called if the datasets update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {UpdateMode} args.mode - The update mode.
	 * @param {object} options - The plugin options.
	 * @since version 2.1.5
	 */
	afterDatasetsUpdate?: ScriptableFunction;
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
	beforeDatasetUpdate?: ScriptableFunction<boolean | void>;
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
	afterDatasetUpdate?: ScriptableFunction;
	/**
	 * @desc Called before laying out `chart`. If any plugin returns `false`,
	 * the layout update is cancelled until another `update` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart layout.
	 */
	beforeLayout?: ScriptableFunction;
	/**
	 * @desc Called before scale data limits are calculated. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	beforeDataLimits?: ScriptableFunction;
	/**
	 * @desc Called after scale data limits are calculated. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	afterDataLimits?: ScriptableFunction;
	/**
	 * @desc Called before scale bulds its ticks. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	beforeBuildTicks?: ScriptableFunction;
	/**
	 * @desc Called after scale has build its ticks. This hook is called separately for each scale in the chart.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Scale} args.scale - The scale.
	 * @param {object} options - The plugin options.
	 */
	afterBuildTicks?: ScriptableFunction;
	/**
	 * @desc Called after the `chart` has been laid out. Note that this hook will not
	 * be called if the layout update has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterLayout?: ScriptableFunction;
	/**
	 * @desc Called before rendering `chart`. If any plugin returns `false`,
	 * the rendering is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart rendering.
	 */
	beforeRender?: ScriptableFunction<boolean | void>;
	/**
	 * @desc Called after the `chart` has been fully rendered (and animation completed). Note
	 * that this hook will not be called if the rendering has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterRender?: ScriptableFunction;
	/**
	 * @desc Called before drawing `chart` at every animation frame. If any plugin returns `false`,
	 * the frame drawing is cancelled untilanother `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart drawing.
	 */
	beforeDraw?: ScriptableFunction<boolean | void>;
	/**
	 * @desc Called after the `chart` has been drawn. Note that this hook will not be called
	 * if the drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterDraw?: ScriptableFunction;
	/**
	 * @desc Called before drawing the `chart` datasets. If any plugin returns `false`,
	 * the datasets drawing is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart datasets drawing.
	 */
	beforeDatasetsDraw?: ScriptableFunction<boolean | void>;
	/**
	 * @desc Called after the `chart` datasets have been drawn. Note that this hook
	 * will not be called if the datasets drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterDatasetsDraw?: ScriptableFunction;
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
	beforeDatasetDraw?: ScriptableFunction<boolean | void>;
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
	afterDatasetDraw?: ScriptableFunction;
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
	beforeEvent?: ScriptableFunction<boolean | void>;
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
	afterEvent?: ScriptableFunction;
	/**
	 * @desc Called after the chart as been resized.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {number} args.size - The new canvas display size (eq. canvas.style width & height).
	 * @param {object} options - The plugin options.
	 */
	resize?: ScriptableFunction;
	/**
	 * Called before the chart is being destroyed.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	beforeDestroy?: ScriptableFunction;
	/**
	 * Called after the chart has been destroyed.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @deprecated since version 3.7.0 in favour of afterDestroy
	 */
	destroy?: ScriptableFunction;
	/**
	 * Called after the chart has been destroyed.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 */
	afterDestroy?: ScriptableFunction;
	/**
	 * Called after chart is destroyed on all plugins that were installed for that chart. This hook is also invoked for disabled plugins (options === false).
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {object} options - The plugin options.
	 * @since 3.0.0
	 */
	uninstall?: ScriptableFunction;

	/**
	 * @desc Called before drawing the `tooltip`. If any plugin returns `false`,
	 * the tooltip drawing is cancelled until another `render` is triggered.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Tooltip} args.tooltip - The tooltip.
	 * @param {object} options - The plugin options.
	 * @returns {boolean} `false` to cancel the chart tooltip drawing.
	 */
	beforeTooltipDraw?: ScriptableFunction;
	/**
	 * @desc Called after drawing the `tooltip`. Note that this hook will not
	 * be called if the tooltip drawing has been previously cancelled.
	 * @param {Chart} chart - The chart instance.
	 * @param {object} args - The call arguments.
	 * @param {Tooltip} args.tooltip - The tooltip.
	 * @param {object} options - The plugin options.
	 */
	afterTooltipDraw?: ScriptableFunction;
}

export interface ChartOptions {
	/**
	 * The base axis of the chart. 'x' for vertical charts and 'y' for horizontal charts.
	 * @default 'x'
	 */
	indexAxis?: 'x' | 'y';

	/**
	 * base color
	 * @see Defaults.color
	 */
	color?: Scriptable<Color>;

	/**
	 * base background color
	 * @see Defaults.backgroundColor
	 */
	backgroundColor?: Scriptable<Color>;

	/**
	 * base border color
	 * @see Defaults.borderColor
	 */
	borderColor?: Scriptable<Color>;

	/**
	 * base font
	 * @see Defaults.font
	 */
	font?: Partial<FontSpec>;

	/**
	 * Resizes the chart canvas when its container does (important note...).
	 * @default true
	 */
	responsive?: boolean;

	/**
	 * Maintain the original canvas aspect ratio (width / height) when resizing.
	 * @default true
	 */
	maintainAspectRatio?: boolean;
	/**
	 * Delay the resize update by give amount of milliseconds. This can ease the resize process by debouncing update of the elements.
	 * @default 0
	 */
	resizeDelay?: number;

	/**
	 * Canvas aspect ratio (i.e. width / height, a value of 1 representing a square canvas). Note that this option is ignored if the height is explicitly defined either as attribute or via the style.
	 * @default 2
	 */
	aspectRatio?: number;

	/**
	 * Locale used for number formatting (using `Intl.NumberFormat`).
	 * @default user's browser setting
	 */
	locale?: string;

	/**
	 * Called when a resize occurs. Gets passed two arguments?: the chart instance and the new size.
	 */
	onResize?: ScriptableFunction;

	/**
	 * Override the window's default devicePixelRatio.
	 * @default window.devicePixelRatio
	 */
	devicePixelRatio?: number;

	interaction?: CoreInteractionOptions;

	hover?: CoreInteractionOptions;

	/**
	 * The events option defines the browser events that the chart should listen to for tooltips and hovering.
	 * @default ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']
	 */
	events?: (
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
	onHover?: ScriptableFunction;

	/**
	 * Called if the event is of type 'mouseup' or 'click'. Passed the event, an array of active elements, and the chart.
	 */
	onClick?: ScriptableFunction;

	layout?: Partial<{
		autoPadding?: boolean;
		padding?: Scriptable<number | Partial<ChartArea>>;
	}>;

	scales?: {
		x?: ScaleOptions;
		y?: ScaleOptions;
	};

	plugins?: {
		legend?: LegendOptions;
		title?: any;
		tooltip?: {
			external?: any;
			callbacks?: any;
		};
	};

	elements?: {
		bar?: ElementOptions;
		arc?: ElementOptions;
		line?: ElementOptions;
		point?: ElementOptions;
	};

	animation?: AnimationSpec;
	animations?: {
		x?: AnimationsSpec;
		y?: AnimationsSpec;
		radius?: AnimationsSpec;
	};
}

export interface ElementOptions {
	backgroundColor?: Scriptable<Color | undefined>;
	borderColor?: Scriptable<Color | undefined>;
	borderCapStyle?: Scriptable<CanvasLineCap>;
	borderDash?: Scriptable<number[] | undefined>;
	borderDashOffset?: Scriptable<number | undefined>;
	borderJoinStyle?: Scriptable<CanvasLineJoin | undefined>;
	borderWidth?: Scriptable<number | undefined>;
	radius?: Scriptable<number | undefined>;
	pointStyle?: Scriptable<PointStyle | undefined>;

	hoverBackgroundColor?: Scriptable<Color | undefined>;
	hoverBorderColor?: Scriptable<Color | undefined>;
	hoverBorderCapStyle?: Scriptable<CanvasLineCap>;
	hoverBorderDash?: Scriptable<number[] | undefined>;
	hoverBorderDashOffset?: Scriptable<number | undefined>;
	hoverBorderJoinStyle?: Scriptable<CanvasLineJoin | undefined>;
	hoverBorderWidth?: Scriptable<number | undefined>;
	hoverRadius?: Scriptable<number | undefined>;
	hoverPointStyle?: Scriptable<PointStyle | undefined>;
}

export interface LegendOptions {
	/**
	 * Is the legend shown?
	 * @default true
	 */
	display?: boolean;
	/**
	 * Position of the legend.
	 * @default 'top'
	 */
	position?: LayoutPosition;
	/**
	 * Alignment of the legend.
	 * @default 'center'
	 */
	align?: 'start' | 'center' | 'end';
	/**
	 * Maximum height of the legend, in pixels
	 */
	maxHeight?: number;
	/**
	 * Maximum width of the legend, in pixels
	 */
	maxWidth?: number;
	/**
	 * Marks that this box should take the full width/height of the canvas (moving other boxes). This is unlikely to need to be changed in day-to-day use.
	 * @default true
	 */
	fullSize?: boolean;
	/**
	 * Legend will show datasets in reverse order.
	 * @default false
	 */
	reverse?: boolean;
	/**
	 * A callback that is called when a click event is registered on a label item.
	 */
	onClick?: ScriptableFunction;
	/**
	 * A callback that is called when a 'mousemove' event is registered on top of a label item
	 */
	onHover?: ScriptableFunction;
	/**
	 * A callback that is called when a 'mousemove' event is registered outside of a previously hovered label item.
	 */
	onLeave?: ScriptableFunction;

	labels?: {
		/**
		 * Width of colored box.
		 * @default 40
		 */
		boxWidth?: number;
		/**
		 * Height of the coloured box.
		 * @default fontSize
		 */
		boxHeight?: number;
		/**
		 * Padding between the color box and the text
		 * @default 1
		 */
		boxPadding?: number;
		/**
		 * Color of label
		 * @see Defaults.color
		 */
		color?: Color;
		/**
		 * Font of label
		 * @see Defaults.font
		 */
		font?: FontSpec;
		/**
		 * Padding between rows of colored boxes.
		 * @default 10
		 */
		padding?: number;
		/**
		 * Generates legend items for each thing in the legend. Default implementation returns the text + styling for the color box. See Legend Item for details.
		 */
		generateLabels?: ScriptableFunction<LegendItem[]>;

		/**
		 * Filters legend items out of the legend. Receives 2 parameters, a Legend Item and the chart data
		 */
		filter?: ScriptableFunction<boolean>;

		/**
		 * Sorts the legend items
		 */
		sort?: ScriptableFunction<number>;

		/**
		 * Override point style for the legend. Only applies if usePointStyle is true
		 */
		pointStyle?: PointStyle;

		/**
		 * Text alignment
		 */
		textAlign?: TextAlign;

		/**
		 * Label style will match corresponding point style (size is based on the minimum value between boxWidth and font.size).
		 * @default false
		 */
		usePointStyle?: boolean;
	};
	/**
	 * true for rendering the legends from right to left.
	 */
	rtl?: boolean;
	/**
	 * This will force the text direction 'rtl' or 'ltr' on the canvas for rendering the legend, regardless of the css specified on the canvas
	 * @default canvas' default
	 */
	textDirection?: string;

	title?: {
		/**
		 * Is the legend title displayed.
		 * @default false
		 */
		display?: boolean;
		/**
		 * Color of title
		 * @see Defaults.color
		 */
		color?: Color;
		/**
		 * see Fonts
		 */
		font?: FontSpec;
		position?: 'center' | 'start' | 'end';
		padding?: number | ChartArea;
		/**
		 * The string title.
		 */
		text?: string;
	};
}

export type TextAlign = 'left' | 'center' | 'right';

export interface BorderRadius {
	topLeft?: number;
	topRight?: number;
	bottomLeft?: number;
	bottomRight?: number;
}

export interface LegendItem {
	/**
	 * Label that will be displayed
	 */
	text?: string;

	/**
	 * Border radius of the legend box
	 * @since 3.1.0
	 */
	borderRadius?: number | BorderRadius;

	/**
	 * Index of the associated dataset
	 */
	datasetIndex?: number;

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

export interface AnimationSpec {
	/**
	 * Callback called on each step of an animation.
	 */
	onProgress?: ScriptableFunction<void>;
	/**
	 * Callback called when all animations are completed.
	 */
	onComplete?: ScriptableFunction<void>;

	/**
	 * The number of milliseconds an animation takes.
	 * @default 1000
	 */
	duration?: Scriptable<number>;
	/**
	 * Easing function to use
	 * @default 'easeOutQuart'
	 */
	easing?: Scriptable<EasingFunction>;

	/**
	 * Delay before starting the animations.
	 * @default 0
	 */
	delay?: Scriptable<number>;

	/**
	 *   If set to true, the animations loop endlessly.
	 * @default false
	 */
	loop?: Scriptable<boolean>;

	x?: AnimationsSpec;

	y?: AnimationsSpec;

	radius?: AnimationsSpec;
}

export interface AnimationsSpec {
	properties?: string[];

	/**
	 * Type of property, determines the interpolator used. Possible values?: 'number', 'color' and 'boolean'. Only really needed for 'color', because typeof does not get that right.
	 */
	type?: 'color' | 'number' | 'boolean';

	fn?: <T>(from?: T, to?: T, factor?: number) => T;

	/**
	 *   If set to true, the animations loop endlessly.
	 * @default false
	 */
	loop?: Scriptable<boolean>;

	/**
	 * Delay before starting the animations.
	 * @default 0
	 */
	delay?: Scriptable<number>;

	/**
	 * The number of milliseconds an animation takes.
	 * @default 1000
	 */
	duration?: Scriptable<number>;
	/**
	 * Easing function to use
	 * @default 'easeOutQuart'
	 */
	easing?: Scriptable<EasingFunction>;

	/**
	 * Start value for the animation. Current value is used when undefined
	 */
	from?: Scriptable<Color | number | boolean>;
	/**
	 *
	 */
	to?: Scriptable<Color | number | boolean>;
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

export interface CoreInteractionOptions {
	/**
	 * Sets which elements appear in the tooltip. See Interaction Modes for details.
	 * @default 'nearest'
	 */
	mode?: any;
	/**
	 * if true, the hover mode only applies when the mouse position intersects an item on the chart.
	 * @default true
	 */
	intersect?: boolean;

	/**
	 * Can be set to 'x', 'y', 'xy' or 'r' to define which directions are used in calculating distances. Defaults to 'x' for 'index' mode and 'xy' in dataset and 'nearest' modes.
	 */
	axis?: 'x' | 'y' | 'xy' | 'r';
}

export interface ChartArea {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
	width?: number;
	height?: number;
}

export interface ScaleOptions {
	/**
	 * Controls the axis global visibility (visible when true, hidden when false). When display?: 'auto', the axis is visible only if at least one associated dataset is visible.
	 * @default true
	 */
	display?: boolean | 'auto';
	/**
	 * Align pixel values to device pixels
	 */
	alignToPixels?: boolean;
	/**
	 * Reverse the scale.
	 * @default false
	 */
	reverse?: boolean;
	/**
	 * The weight used to sort the axis. Higher weights are further away from the chart area.
	 * @default true
	 */
	weight?: number;
	/**
	 * Callback called before the update process starts.
	 */
	beforeUpdate?: ScriptableFunction;
	/**
	 * Callback that runs before dimensions are set.
	 */
	beforeSetDimensions?: ScriptableFunction;
	/**
	 * Callback that runs after dimensions are set.
	 */
	afterSetDimensions?: ScriptableFunction;
	/**
	 * Callback that runs before data limits are determined.
	 */
	beforeDataLimits?: ScriptableFunction;
	/**
	 * Callback that runs after data limits are determined.
	 */
	afterDataLimits?: ScriptableFunction;
	/**
	 * Callback that runs before ticks are created.
	 */
	beforeBuildTicks?: ScriptableFunction;
	/**
	 * Callback that runs after ticks are created. Useful for filtering ticks.
	 */
	afterBuildTicks?: ScriptableFunction;
	/**
	 * Callback that runs before ticks are converted into strings.
	 */
	beforeTickToLabelConversion?: ScriptableFunction;
	/**
	 * Callback that runs after ticks are converted into strings.
	 */
	afterTickToLabelConversion?: ScriptableFunction;
	/**
	 * Callback that runs before tick rotation is determined.
	 */
	beforeCalculateLabelRotation?: ScriptableFunction;
	/**
	 * Callback that runs after tick rotation is determined.
	 */
	afterCalculateLabelRotation?: ScriptableFunction;
	/**
	 * Callback that runs before the scale fits to the canvas.
	 */
	beforeFit?: ScriptableFunction;
	/**
	 * Callback that runs after the scale fits to the canvas.
	 */
	afterFit?: ScriptableFunction;
	/**
	 * Callback that runs at the end of the update process.
	 */
	afterUpdate?: ScriptableFunction;

	/**
	 * Scale boundary strategy (bypassed by min/max time options)
	 * - `data`: make sure data are fully visible, ticks outside are removed
	 * - `ticks`: make sure ticks are fully visible, data outside are truncated
	 * @since 2.7.0
	 * @default 'ticks'
	 */
	bounds?: 'ticks' | 'data';

	/**
	 * Position of the axis.
	 */
	position?:
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
	 *   Which type of axis this is. Possible values are?: 'x', 'y'. If not set, this is inferred from the first character of the ID which should be 'x' or 'y'.
	 */
	axis?: 'x' | 'y';

	/**
	 * User defined minimum value for the scale, overrides minimum value from data.
	 */
	min?: number;

	/**
	 * User defined maximum value for the scale, overrides maximum value from data.
	 */
	max?: number;

	/**
	 *   If true, extra space is added to the both edges and the axis is scaled to fit into the chart area. This is set to true for a bar chart by default.
	 * @default false
	 */
	offset?: boolean;

	grid?: GridLineOptions;

	/** Options for the scale title. */
	title?: {
		/** If true, displays the axis title. */
		display?: boolean;
		/** Alignment of the axis title. */
		align?: 'start' | 'center' | 'end';
		/** The text for the title, e.g. "# of People" or "Response Choices". */
		text?: string | string[];
		/** Color of the axis label. */
		color?: Color;
		/** Information about the axis title font. */
		font?: FontSpec;
		/** Padding to apply around scale labels. */
		padding:
			| number
			| {
					/** Padding on the (relative) top side of this axis label. */
					top?: number;
					/** Padding on the (relative) bottom side of this axis label. */
					bottom?: number;
					/** This is a shorthand for defining top/bottom to the same values. */
					y?: number;
			  };
	};

	/**
	 *   If true, data will be comprised between datasets of data
	 * @default false
	 */
	stacked?: boolean | 'single';

	ticks?: TickOptions;

	animate?: boolean;

	angleLines?: {
		/**
		 * if true, angle lines are shown.
		 * @default true
		 */
		display?: boolean;
		/**
		 * Color of angled lines.
		 * @default 'rgba(0, 0, 0, 0.1)'
		 */
		color?: Scriptable<Color>;
		/**
		 * Width of angled lines.
		 * @default 1
		 */
		lineWidth?: Scriptable<number>;
		/**
		 * Length and spacing of dashes on angled lines. See MDN.
		 * @default []
		 */
		borderDash?: Scriptable<number[]>;
		/**
		 * Offset for line dashes. See MDN.
		 * @default 0
		 */
		borderDashOffset?: Scriptable<number>;
	};

	/**
	 * if true, scale will include 0 if it is not already included.
	 * @default false
	 */
	beginAtZero?: boolean;

	pointLabels?: {
		/**
		 * Background color of the point label.
		 * @default undefined
		 */
		backdropColor?: Scriptable<Color>;
		/**
		 * Padding of label backdrop.
		 * @default 2
		 */
		backdropPadding?: Scriptable<number>;

		/**
		 * if true, point labels are shown.
		 * @default true
		 */
		display?: boolean;
		/**
		 * Color of label
		 * @see Defaults.color
		 */
		color?: Scriptable<Color>;
		/**
		 */
		font?: Scriptable<FontSpec>;

		/**
		 * Callback function to transform data labels to point labels. The default implementation simply returns the current string.
		 */
		callback?: (
			label?: string,
			index?: number
		) => string | string[] | number | number[];

		/**
		 * if true, point labels are centered.
		 * @default false
		 */
		centerPointLabels?: boolean;
	};

	/**
	 * Adjustment used when calculating the maximum data value.
	 */
	suggestedMax?: number;
	/**
	 * Adjustment used when calculating the minimum data value.
	 */
	suggestedMin?: number;
}

export interface GridLineOptions {
	/**
	 * @default true
	 */
	display?: boolean;
	borderColor?: Color;
	borderWidth?: number;
	/**
	 * @default false
	 */
	circular?: boolean;
	/**
	 * @default 'rgba(0, 0, 0, 0.1)'
	 */
	color?: Scriptable<Color> | readonly Color[];
	/**
	 * @default []
	 */
	borderDash?: number[];
	/**
	 * @default 0
	 */
	borderDashOffset?: Scriptable<number>;
	/**
	 * @default 1
	 */
	lineWidth?: Scriptable<number[]>;

	/**
	 * @default true
	 */
	drawBorder?: boolean;
	/**
	 * @default true
	 */
	drawOnChartArea?: boolean;
	/**
	 * @default true
	 */
	drawTicks?: boolean;
	/**
	 * @default []
	 */
	tickBorderDash?: number[];
	/**
	 * @default 0
	 */
	tickBorderDashOffset?: Scriptable<number>;
	/**
	 * @default 'rgba(0, 0, 0, 0.1)'
	 */
	tickColor?: Scriptable<Color> | readonly Color[];
	/**
	 * @default 10
	 */
	tickLength?: number;
	/**
	 * @default 1
	 */
	tickWidth?: number;
	/**
	 * @default false
	 */
	offset?: boolean;
	/**
	 * @default 0
	 */
	z?: number;
}

export interface TickOptions {
	/**
	 * Color of label backdrops.
	 * @default 'rgba(255, 255, 255, 0.75)'
	 */
	backdropColor?: Scriptable<Color>;
	/**
	 * Padding of tick backdrop.
	 * @default 2
	 */
	backdropPadding?: number | ChartArea;

	/**
	 * Returns the string representation of the tick value as it should be displayed on the chart. See callback.
	 */
	callback?: ScriptableFunction<
		string | string[] | number | number[] | null | undefined
	>;

	/**
	 * If true, show tick labels.
	 * @default true
	 */
	display?: boolean;
	/**
	 * Color of tick
	 * @see Defaults.color
	 */
	color?: Scriptable<Color>;
	/**
	 * see Fonts
	 */
	font?: Scriptable<FontSpec>;
	/**
	 * Sets the offset of the tick labels from the axis
	 */
	padding?: number;
	/**
	 * If true, draw a background behind the tick labels.
	 * @default false
	 */
	showLabelBackdrop?: Scriptable<boolean>;
	/**
	 * The color of the stroke around the text.
	 * @default undefined
	 */
	textStrokeColor?: Scriptable<Color>;
	/**
	 * Stroke width around the text.
	 * @default 0
	 */
	textStrokeWidth?: Scriptable<number>;
	/**
	 * z-index of tick layer. Useful when ticks are drawn on chart area. Values <= 0 are drawn under datasets, > 0 on top.
	 * @default 0
	 */
	z?: number;

	major?: {
		/**
		 * If true, major ticks are generated. A major tick will affect autoskipping and major will be defined on ticks in the scriptable options context.
		 * @default false
		 */
		enabled?: boolean;
	};

	/**
	 * The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
	 * @default ticks.length
	 */
	sampleSize?: number;
	/**
	 * The label alignment
	 * @default 'center'
	 */
	align?: 'start' | 'center' | 'end';
	/**
	 *   If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to maxRotation before skipping any. Turn autoSkip off to show all labels no matter what.
	 * @default true
	 */
	autoSkip?: boolean;
	/**
	 * Padding between the ticks on the horizontal axis when autoSkip is enabled.
	 * @default 0
	 */
	autoSkipPadding?: number;

	/**
	 * How is the label positioned perpendicular to the axis direction.
	 * This only applies when the rotation is 0 and the axis position is one of "top", "left", "right", or "bottom"
	 * @default 'near'
	 */
	crossAlign?: 'near' | 'center' | 'far';

	/**
	 * Should the defined `min` and `max` values be presented as ticks even if they are not "nice".
	 * @default?: true
	 */
	includeBounds?: boolean;

	/**
	 * Distance in pixels to offset the label from the centre point of the tick (in the x direction for the x axis, and the y direction for the y axis). Note?: this can cause labels at the edges to be cropped by the edge of the canvas
	 * @default 0
	 */
	labelOffset?: number;

	/**
	 * Minimum rotation for tick labels. Note?: Only applicable to horizontal scales.
	 * @default 0
	 */
	minRotation?: number;
	/**
	 * Maximum rotation for tick labels when rotating to condense labels. Note?: Rotation doesn't occur until necessary. Note?: Only applicable to horizontal scales.
	 * @default 50
	 */
	maxRotation?: number;
	/**
	 * Flips tick labels around axis, displaying the labels inside the chart instead of outside. Note?: Only applicable to vertical scales.
	 * @default false
	 */
	mirror?: boolean;
}

export interface FontSpec {
	/**
	 * Default font family for all text, follows CSS font-family options.
	 * @default "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
	 */
	family?: string;
	/**
	 * Default font size (in px) for text. Does not apply to radialLinear scale point labels.
	 * @default 12
	 */
	size?: number;
	/**
	 * Default font style. Does not apply to tooltip title or footer. Does not apply to chart title. Follows CSS font-style options (i.e. normal, italic, oblique, initial, inherit)
	 * @default 'normal'
	 */
	style?: 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit';
	/**
	 * Default font weight (boldness). (see MDN).
	 */
	weight?: string | null;
	/**
	 * Height of an individual line of text (see MDN).
	 * @default 1.2
	 */
	lineHeight?: number | string;
}

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<string, never>;
export type Color = string | CanvasGradient | CanvasPattern;

export type Scriptable<T> =
	| T
	| ((ctx?: any, options?: AnyObject) => T | undefined)
	| string;

export type ScriptableAndArray<T> = readonly T[] | Scriptable<T[]> | string;

/**
 * TData represents the data point type. If unspecified, a default is provided
 *   based on the chart type.
 * TLabel represents the label type
 */
export interface ChartData {
	/**
	 * Labels
	 */
	labels?: ScriptableAndArray<string>;

	/**
	 * Data sets
	 */
	datasets?: ChartDataset[];
}

export interface ChartDataset {
	segment?: {
		backgroundColor?: Scriptable<Color | undefined>;
		borderColor?: Scriptable<Color | undefined>;
		borderCapStyle?: Scriptable<CanvasLineCap | undefined>;
		borderDash?: Scriptable<number[] | undefined>;
		borderDashOffset?: Scriptable<number | undefined>;
		borderJoinStyle?: Scriptable<CanvasLineJoin | undefined>;
		borderWidth?: Scriptable<number | undefined>;
	};

	/**
	 * base background color
	 * @see Defaults.backgroundColor
	 */
	backgroundColor?: Scriptable<Color>;

	/**
	 * Color of the border.
	 * @default 'rgba(0, 0, 0, 0)'
	 */
	borderColor?: Scriptable<Color>;

	/**
	 * Size of the border.
	 * @default 0
	 */
	borderWidth?: Scriptable<number>;

	/**
	 * Both line and radar charts support a fill option on the dataset object which can be used to create area between two datasets or a dataset and a boundary, i.e. the scale origin, start or end
	 */
	fill?: FillTarget | ComplexFillTarget;

	/**
	 * The label for the dataset which appears in the legend and tooltips.
	 */
	label?: string;

	data?: any[];
}

export type FillTarget =
	| number
	| string
	| { value?: number }
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
	target?: FillTarget;
	/**
	 * If no color is set, the default color will be the background color of the chart.
	 */
	above?: Color;
	/**
	 * Same as the above.
	 */
	below?: Color;
}
