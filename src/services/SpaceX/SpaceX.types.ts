export interface SpacexLaunch {
  fairings:              Fairings;
  links:                 Links;
  static_fire_date_utc:  Date;
  static_fire_date_unix: number;
  net:                   boolean;
  window:                number;
  rocket:                Rocket;
  success:               boolean;
  failures:              Failure[];
  details:               string;
  crew:                  any[];
  ships:                 any[];
  capsules:              any[];
  payloads:              Payload[];
  launchpad:             string;
  flight_number:         number;
  name:                  string;
  date_utc:              Date;
  date_unix:             number;
  date_local:            Date;
  date_precision:        string;
  upcoming:              boolean;
  cores:                 Core[];
  auto_update:           boolean;
  tbd:                   boolean;
  launch_library_id:     null;
  id:                    string;
}

interface Core {
  core:            string;
  flight:          number;
  gridfins:        boolean;
  legs:            boolean;
  reused:          boolean;
  landing_attempt: boolean;
  landing_success: null;
  landing_type:    null;
  landpad:         null;
}

interface Failure {
  time:     number;
  altitude: null;
  reason:   string;
}

interface Fairings {
  reused:           boolean;
  recovery_attempt: boolean;
  recovered:        boolean;
  ships:            any[];
}

interface Links {
  patch:      Patch;
  reddit:     Reddit;
  flickr:     Flickr;
  presskit:   null;
  webcast:    string;
  youtube_id: string;
  article:    string;
  wikipedia:  string;
}

interface Flickr {
  small:    any[];
  original: any[];
}

interface Patch {
  small: string;
  large: string;
}

interface Reddit {
  campaign: null;
  launch:   null;
  media:    null;
  recovery: null;
}

interface Payload {
  dragon:             Dragon;
  name:               string;
  type:               string;
  reused:             boolean;
  launch:             string;
  customers:          string[];
  norad_ids:          any[];
  nationalities:      string[];
  manufacturers:      string[];
  mass_kg:            number;
  mass_lbs:           number;
  orbit:              string;
  reference_system:   string;
  regime:             string;
  longitude:          null;
  semi_major_axis_km: null;
  eccentricity:       null;
  periapsis_km:       number;
  apoapsis_km:        number;
  inclination_deg:    number;
  period_min:         null;
  lifespan_years:     null;
  epoch:              null;
  mean_motion:        null;
  raan:               null;
  arg_of_pericenter:  null;
  mean_anomaly:       null;
  id:                 string;
}

interface Dragon {
  capsule:           null;
  mass_returned_kg:  null;
  mass_returned_lbs: null;
  flight_time_sec:   null;
  manifest:          null;
  water_landing:     null;
  land_landing:      null;
}

interface Rocket {
  height:           Diameter;
  diameter:         Diameter;
  mass:             Mass;
  first_stage:      FirstStage;
  second_stage:     SecondStage;
  engines:          Engines;
  landing_legs:     LandingLegs;
  payload_weights:  PayloadWeight[];
  flickr_images:    string[];
  name:             string;
  type:             string;
  active:           boolean;
  stages:           number;
  boosters:         number;
  cost_per_launch:  number;
  success_rate_pct: number;
  first_flight:     Date;
  country:          string;
  company:          string;
  wikipedia:        string;
  description:      string;
  id:               string;
}

interface Diameter {
  meters: number;
  feet:   number;
}

interface Engines {
  isp:              ISP;
  thrust_sea_level: Thrust;
  thrust_vacuum:    Thrust;
  number:           number;
  type:             string;
  version:          string;
  layout:           string;
  engine_loss_max:  number;
  propellant_1:     string;
  propellant_2:     string;
  thrust_to_weight: number;
}

interface ISP {
  sea_level: number;
  vacuum:    number;
}

interface Thrust {
  kN:  number;
  lbf: number;
}

interface FirstStage {
  thrust_sea_level: Thrust;
  thrust_vacuum:    Thrust;
  reusable:         boolean;
  engines:          number;
  fuel_amount_tons: number;
  burn_time_sec:    number;
}

interface LandingLegs {
  number:   number;
  material: null;
}

interface Mass {
  kg: number;
  lb: number;
}

interface PayloadWeight {
  id:   string;
  name: string;
  kg:   number;
  lb:   number;
}

interface SecondStage {
  thrust:           Thrust;
  payloads:         Payloads;
  reusable:         boolean;
  engines:          number;
  fuel_amount_tons: number;
  burn_time_sec:    number;
}

interface Payloads {
  composite_fairing: CompositeFairing;
  option_1:          string;
}

interface CompositeFairing {
  height:   Diameter;
  diameter: Diameter;
}
