export default function calc_gd_volumetric(
  a,
  b,
  gas_vol,
  gas_bg,
  soi_gz,
  swr_gz,
  sor_gz,
  oil_sf,
  swi_wz,
  swr_wz,
  ref_level = -994
) {
  let gas_pv = 0.0;
  let oil_pv = 0.0;
  let gas_level_m = ref_level;
  let oil_level_m = ref_level;
  let oil_layer_thickness_m = 0.0;
  let total_oil_volume_contacted_by_gas = 0.0;
  let drainable_oil_volume_contacted_by_gas = 0.0;
  let oil_drainage_recovery_efficiency = 0.0;

  if (gas_vol > 0) {
    gas_pv = (gas_vol * gas_bg * 100.0) / (100.0 - swr_gz - sor_gz);
    gas_level_m -= (-b + Math.sqrt(b * b + 4.0 * a * gas_pv)) / (2.0 * a);

    total_oil_volume_contacted_by_gas = gas_pv * oil_sf * (soi_gz / 100.0);
    drainable_oil_volume_contacted_by_gas =
      gas_pv * ((soi_gz - sor_gz) / 100.0) * oil_sf;
    oil_drainage_recovery_efficiency =
      (100.0 * drainable_oil_volume_contacted_by_gas) /
      total_oil_volume_contacted_by_gas;
    oil_pv = (drainable_oil_volume_contacted_by_gas * 100) / (swi_wz - swr_wz);
    oil_level_m -=
      (-b + Math.sqrt(b * b + 4.0 * a * (gas_pv + oil_pv))) / (2.0 * a);
    oil_layer_thickness_m = gas_level_m - oil_level_m;
  } else {
    // upto -994 there is not much pore volume
    gas_level_m = ref_level + 4.5;
    oil_level_m = ref_level + 4.5;
  }
  return [
    gas_pv,
    oil_pv,
    gas_level_m,
    oil_level_m,
    oil_layer_thickness_m,
    total_oil_volume_contacted_by_gas,
    drainable_oil_volume_contacted_by_gas,
    oil_drainage_recovery_efficiency,
  ];
}
