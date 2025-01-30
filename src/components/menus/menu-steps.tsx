import { Tables } from '@/types/database';
import { useMenuSteps } from '@/hooks/use-menu-steps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { format, formatDuration, intervalToDuration, Duration } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronUp,
  XCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Json } from '@/types/database';
import React from 'react';

type MenuStep = Tables<'stream_ai_run_step'>;
type StepType = MenuStep['step'];

const STEP_TYPES: StepType[] = [
  'menu_ocr',
  'menu_recipe',
  'menu_environmental_impact',
  'menu_summary',
];

interface MenuStepsProps {
  menuId: string;
}

interface StepCardProps {
  step?: MenuStep;
  type: StepType;
  t: ReturnType<typeof useTranslations>;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

function StepCard({ step, type, t, isCollapsed, onToggleCollapse }: StepCardProps) {
  const [elapsedTime, setElapsedTime] = useState<Duration | null>(null);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [isOutputExpanded, setIsOutputExpanded] = useState(false);

  const stepNumber = STEP_TYPES.indexOf(type) + 1;

  useEffect(() => {
    if (!step || step.finished_at) {
      setElapsedTime(null);
      return;
    }

    const updateElapsedTime = () => {
      const duration = intervalToDuration({
        start: new Date(step.created_at),
        end: new Date(),
      });
      setElapsedTime(duration);
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const getStatusInfo = () => {
    if (!step) {
      return {
        label: t('menus.steps.status_not_started'),
        icon: Circle,
        color: 'text-muted-foreground bg-muted',
      };
    }
    if (step.error_message) {
      return {
        label: t('menus.steps.status_error'),
        icon: XCircle,
        color: 'text-destructive bg-destructive/10',
      };
    }
    if (step.finished_at) {
      return {
        label: t('menus.steps.status_completed'),
        icon: CheckCircle2,
        color: 'text-green-500 bg-green-500/10',
      };
    }
    return {
      label: t('menus.steps.status_in_progress'),
      icon: Clock,
      color: 'text-blue-500 bg-blue-500/10',
    };
  };

  const status = getStatusInfo();

  const JsonViewer = ({
    data,
    isExpanded,
    onToggle,
    label,
  }: {
    data: Json;
    isExpanded: boolean;
    onToggle: () => void;
    label: string;
  }) => (
    <div className="border rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{t(`menus.steps.${label}`)}</p>
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onToggle}>
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              {t('menus.steps.collapse')}
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              {t('menus.steps.expand')}
            </>
          )}
        </Button>
      </div>
      {isExpanded && (
        <pre className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md overflow-auto max-h-[300px] border">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );

  return (
    <Card
      key={type}
      className="relative overflow-hidden border-0 border-b border-border last:border-b-0 rounded-none first:rounded-t-lg last:rounded-b-lg"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-muted">
        <div
          className={cn(
            'absolute inset-0 transition-all duration-300 ease-in-out h-full',
            step?.finished_at ? 'bg-green-500' : step ? 'bg-blue-500/50' : 'h-0'
          )}
        />
      </div>
      <CardHeader
        className="relative py-3 cursor-pointer hover:bg-muted/70 transition-colors bg-muted/30 border-b border-border"
        onClick={onToggleCollapse}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
              <span className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {stepNumber}
                </span>
                {t(`menus.steps.${type}`)}
              </span>
            </div>
          </CardTitle>
          <Badge variant="secondary" className={cn('gap-1.5', status.color)}>
            <status.icon className="h-3.5 w-3.5" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="p-6">
          {step ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('menus.steps.createdAt')}
                  </p>
                  <p className="text-sm">{format(new Date(step.created_at), 'PPpp')}</p>
                </div>
                {step.finished_at && (
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t('menus.steps.finishedAt')}
                    </p>
                    <p className="text-sm">{format(new Date(step.finished_at), 'PPpp')}</p>
                  </div>
                )}
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('menus.steps.duration')}
                  </p>
                  <p className="text-sm">
                    {step.finished_at
                      ? formatDuration(
                          intervalToDuration({
                            start: new Date(step.created_at),
                            end: new Date(step.finished_at),
                          })
                        )
                      : elapsedTime
                      ? formatDuration(elapsedTime)
                      : '--:--'}
                  </p>
                </div>
              </div>

              {step.error_message && (
                <div className="bg-destructive/10 border-destructive/20 border rounded-lg p-3">
                  <p className="text-sm font-medium text-destructive mb-1">
                    {t('menus.steps.error')}
                  </p>
                  <p className="text-sm text-destructive/80">{step.error_message}</p>
                </div>
              )}

              <div className="space-y-3">
                <JsonViewer
                  data={step.input}
                  isExpanded={isInputExpanded}
                  onToggle={() => setIsInputExpanded(!isInputExpanded)}
                  label="input"
                />
                {step.output && (
                  <JsonViewer
                    data={step.output}
                    isExpanded={isOutputExpanded}
                    onToggle={() => setIsOutputExpanded(!isOutputExpanded)}
                    label="output"
                  />
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">{t('menus.steps.notStarted')}</p>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export function MenuSteps({ menuId }: MenuStepsProps) {
  const { data: steps } = useMenuSteps(menuId);
  const t = useTranslations();
  const [collapsedSteps, setCollapsedSteps] = useState<Record<string, boolean>>(() =>
    STEP_TYPES.reduce((acc, type) => {
      acc[type] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [allCollapsed, setAllCollapsed] = useState(false);

  useEffect(() => {
    if (steps) {
      setCollapsedSteps(
        STEP_TYPES.reduce((acc, type) => {
          const step = steps.find(s => s.step === type);
          acc[type] =
            step?.finished_at && !step.error_message && type !== 'menu_summary' ? true : false;
          return acc;
        }, {} as Record<string, boolean>)
      );
    }
  }, [steps]);

  const toggleAllCollapse = () => {
    const newState = !allCollapsed;
    setAllCollapsed(newState);
    const newCollapsedSteps = STEP_TYPES.reduce((acc, type) => {
      acc[type] = newState;
      return acc;
    }, {} as Record<string, boolean>);
    setCollapsedSteps(newCollapsedSteps);
  };

  const toggleStepCollapse = (type: StepType) => {
    setCollapsedSteps(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={toggleAllCollapse} className="gap-2">
          {allCollapsed ? (
            <>
              <Maximize2 className="h-4 w-4" />
              {t('menus.steps.expandAll')}
            </>
          ) : (
            <>
              <Minimize2 className="h-4 w-4" />
              {t('menus.steps.collapseAll')}
            </>
          )}
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        {STEP_TYPES.map(type => (
          <StepCard
            key={type}
            type={type}
            step={steps?.find(step => step.step === type)}
            t={t}
            isCollapsed={collapsedSteps[type]}
            onToggleCollapse={() => toggleStepCollapse(type)}
          />
        ))}
      </div>
    </div>
  );
}
