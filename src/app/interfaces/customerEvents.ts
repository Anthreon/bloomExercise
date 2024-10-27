// Specific interfaces for each event type
interface SessionStartEvent {
  type: 'session_start';
  properties: {
    activity: string;
    browser: string;
    cookie: string;
    device: string;
    location: string;
    os: string;
    path: string;
    referrer: string;
    ip: string;
    country: string;
    state: string;
    city: string;
    latitude: number;
    longitude: number;
  };
}

interface SessionEndEvent {
  type: 'session_end';
  properties: {
    activity: string;
    browser: string;
    cookie: string;
    device: string;
    location: string;
    os: string;
    path: string;
    referrer: string;
    created: number;
    last_update: number;
    duration: number;
    ip: string;
    country: string;
    state: string;
    city: string;
    latitude: number;
    longitude: number;
  };
}

interface PageVisitEvent {
  type: 'page_visit';
  properties: {
    browser: string;
    device: string;
    location: string;
    os: string;
    path: string;
    referrer: string;
  };
}

interface PurchaseEvent {
  type: 'purchase';
  properties: {
    purchase_status: string;
    total_price: number;
    product_list: string;
    product_ids: string;
    voucher: string;
    discount_value: string;
    currency: string;
    payment_method: string;
    purchase_id: string;
    purchase_source_type: string;
  };
}

interface CartUpdateEvent {
  type: 'cart_update';
  properties: {
    product_id: string;
    variant_id: string;
    category_level_1: string;
    category_level_2: string;
    category_level_3: string;
    product_list: string;
    action: string;
  };
}

interface ViewItemEvent {
  type: 'view_item';
  properties: {
    product_id: string;
    variant_id: string;
    category_level_1: string;
    category_level_2: string;
    category_level_3: string;
  };
}

// Union type for all specific event types
export type EventTypes =
  | SessionStartEvent
  | SessionEndEvent
  | PageVisitEvent
  | PurchaseEvent
  | CartUpdateEvent
  | ViewItemEvent;

// Complete data structure interface
export interface CustomerEventsDataStructure {
  events: EventTypes[];
}
