import { IndicatorGeneralDetails } from '@/types/valvo';
import { IndicatorCard } from './indicator-card';

interface IndicatorGridProps {
  indicators: IndicatorGeneralDetails;
}

export function IndicatorGrid({ indicators }: IndicatorGridProps) {
  return (
    <div className="container max-w-4xl mx-auto relative mt-10">
      <h2 className="text-xl font-bold text-center uppercase">Indicateurs physiologiques</h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        {indicators.mortality && (
          <IndicatorCard
            value={indicators.mortality.value}
            label="ML"
            tooltip="Mortality Level"
            indicator={indicators.mortality.indicator}
            reason={indicators.mortality.reason}
          />
        )}
        {indicators.agitation && (
          <IndicatorCard
            value={indicators.agitation.value}
            label="GAL"
            tooltip="Global Agitation Level"
            unit="mm"
            indicator={indicators.agitation.indicator}
            reason={indicators.agitation.reason}
          />
        )}
        {indicators.agitation_during_opening_period && (
          <IndicatorCard
            value={indicators.agitation_during_opening_period.value}
            label="OAL"
            tooltip="Opening Agitation Level"
            unit="mm"
            indicator={indicators.agitation_during_opening_period.indicator}
            reason={indicators.agitation_during_opening_period.reason}
          />
        )}
        {indicators.valve_closing_duration && (
          <IndicatorCard
            value={indicators.valve_closing_duration.value}
            label="VOD"
            tooltip="Valve Opening Duration"
            unit="%/h"
            indicator={indicators.valve_closing_duration.indicator}
            reason={indicators.valve_closing_duration.reason}
          />
        )}
        {indicators.valve_opening_amplitude && (
          <IndicatorCard
            value={indicators.valve_opening_amplitude.value}
            label="VOA"
            tooltip="Valve Opening Amplitude"
            unit="%"
            indicator={indicators.valve_opening_amplitude.indicator}
            reason={indicators.valve_opening_amplitude.reason}
          />
        )}
        {indicators.night_and_day_rhythm && (
          <IndicatorCard
            value={indicators.night_and_day_rhythm.value}
            label="NDR"
            tooltip="Night/Day Rhythm"
            unit="%"
            indicator={indicators.night_and_day_rhythm.indicator}
            reason={indicators.night_and_day_rhythm.reason}
          />
        )}
        {indicators.tidal_rhythm && (
          <IndicatorCard
            value={indicators.tidal_rhythm.value}
            label="TID"
            tooltip="Tidal Rhythm"
            unit="%"
            indicator={indicators.tidal_rhythm.indicator}
            reason={indicators.tidal_rhythm.reason}
          />
        )}
        {indicators.growth && (
          <IndicatorCard
            value={indicators.growth.value}
            label="GRO"
            tooltip="Growth"
            unit="mm"
            indicator={indicators.growth.indicator}
            reason={indicators.growth.reason}
          />
        )}
        {indicators.max_amplitude && (
          <IndicatorCard
            value={indicators.max_amplitude.value}
            label="MA"
            tooltip="Maximal Amplitude"
            unit="mm"
            indicator={indicators.max_amplitude.indicator}
            reason={indicators.max_amplitude.reason}
          />
        )}
        {indicators.spawning && (
          <IndicatorCard
            value={indicators.spawning.value}
            label="Ponte"
            tooltip="Ponte"
            indicator={indicators.spawning.indicator}
            reason={indicators.spawning.reason}
          />
        )}
      </div>
    </div>
  );
}
