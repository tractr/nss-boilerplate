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
  Edit,
  History,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Json } from '@/types/database';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabaseClient from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';

type MenuStep = Tables<'stream_ai_run_steps'>;
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
  steps: MenuStep[];
  type: StepType;
  t: ReturnType<typeof useTranslations>;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface EditStepInputDialogProps {
  step?: MenuStep;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface StepHistoryDialogProps {
  steps: MenuStep[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: ReturnType<typeof useTranslations>;
}

function EditStepInputDialog({ step, open, onOpenChange }: EditStepInputDialogProps) {
  const t = useTranslations();
  const [input, setInput] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (step?.input) {
      setInput(JSON.stringify(step.input, null, 2));
    }
  }, [step]);

  const mutation = useMutation({
    mutationFn: async (input: Json) => {
      if (!step) return;

      const { data: newStep, error } = await supabaseClient
        .from('stream_ai_run_steps')
        .insert({
          run: step.run,
          step: step.step,
          input,
        })
        .select()
        .single();

      if (error) throw error;
      return newStep;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-steps'] });
      toast({
        title: t('menus.steps.editSuccess'),
        description: t('menus.steps.editSuccessDescription'),
      });
      onOpenChange(false);
    },
    onError: error => {
      toast({
        title: t('menus.steps.editError'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSave = () => {
    try {
      const parsedInput = JSON.parse(input);
      mutation.mutate(parsedInput);
    } catch (error) {
      toast({
        title: t('menus.steps.invalidJson'),
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('menus.steps.editInput')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-96 font-mono text-sm p-4 rounded-md border bg-muted/50"
            spellCheck={false}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('actions.cancel')}
          </Button>
          <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? t('actions.saving') : t('actions.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StepHistoryDialog({ steps, open, onOpenChange, t }: StepHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('menus.steps.history')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {steps
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map(step => (
              <Card key={step.id} className="border">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {format(new Date(step.created_at), 'PPpp')}
                    </p>
                    {step.finished_at && (
                      <Badge
                        variant="secondary"
                        className={
                          step.error_message
                            ? 'text-destructive bg-destructive/10'
                            : 'text-green-500 bg-green-500/10'
                        }
                      >
                        {step.error_message
                          ? t('menus.steps.status_error')
                          : t('menus.steps.status_completed')}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <p className="text-sm font-medium mb-2">{t('menus.steps.input')}</p>
                      <pre className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md overflow-auto max-h-[200px] border">
                        {JSON.stringify(step.input, null, 2)}
                      </pre>
                    </div>
                    {step.output && (
                      <div className="border rounded-lg p-3">
                        <p className="text-sm font-medium mb-2">{t('menus.steps.output')}</p>
                        <pre className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md overflow-auto max-h-[200px] border">
                          {JSON.stringify(step.output, null, 2)}
                        </pre>
                      </div>
                    )}
                    {step.error_message && (
                      <div className="bg-destructive/10 border-destructive/20 border rounded-lg p-3">
                        <p className="text-sm font-medium text-destructive mb-1">
                          {t('menus.steps.error')}
                        </p>
                        <p className="text-sm text-destructive/80">{step.error_message}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StepCard({ steps, type, t, isCollapsed, onToggleCollapse }: StepCardProps) {
  const [elapsedTime, setElapsedTime] = useState<Duration | null>(null);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [isOutputExpanded, setIsOutputExpanded] = useState(false);
  const [isEditInputOpen, setIsEditInputOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const step =
    steps.length > 0
      ? steps.reduce((latest, current) =>
          new Date(current.created_at) > new Date(latest.created_at) ? current : latest
        )
      : undefined;

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
    if (step.status === 'created') {
      return {
        label: t('menus.steps.status_created'),
        icon: Clock,
        color: 'text-blue-500 bg-blue-500/10',
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
    canEdit,
  }: {
    data: Json;
    isExpanded: boolean;
    onToggle: () => void;
    label: string;
    canEdit?: boolean;
  }) => (
    <div className="border rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{t(`menus.steps.${label}`)}</p>
        <div className="flex items-center gap-2">
          {canEdit && type !== 'menu_ocr' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={() => setIsEditInputOpen(true)}
            >
              <Edit className="h-4 w-4 mr-1" />
              {t('actions.edit')}
            </Button>
          )}
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
      </div>
      {isExpanded && (
        <pre className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md overflow-auto max-h-[300px] border">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );

  return (
    <>
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
            <div className="flex items-center gap-2">
              {steps.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={e => {
                    e.stopPropagation();
                    setIsHistoryOpen(true);
                  }}
                >
                  <History className="h-4 w-4" />
                  {t('menus.steps.viewHistory')}
                </Button>
              )}
              <Badge variant="secondary" className={cn('gap-1.5', status.color)}>
                <status.icon className="h-3.5 w-3.5" />
                {status.label}
              </Badge>
            </div>
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
                    <p className="text-sm flex items-center gap-1.5">
                      {!step.finished_at && elapsedTime && (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      )}
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
                    canEdit={true}
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
      <EditStepInputDialog step={step} open={isEditInputOpen} onOpenChange={setIsEditInputOpen} />
      <StepHistoryDialog steps={steps} open={isHistoryOpen} onOpenChange={setIsHistoryOpen} t={t} />
    </>
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

  const stepsByType = STEP_TYPES.reduce((acc, type) => {
    acc[type] = steps?.filter(step => step.step === type) || [];
    return acc;
  }, {} as Record<string, MenuStep[]>);

  useEffect(() => {
    if (steps) {
      setCollapsedSteps(
        STEP_TYPES.reduce((acc, type) => {
          const typeSteps = stepsByType[type];
          const latestStep =
            typeSteps.length > 0
              ? typeSteps.reduce((latest, current) =>
                  new Date(current.created_at) > new Date(latest.created_at) ? current : latest
                )
              : undefined;
          acc[type] =
            latestStep?.finished_at && !latestStep.error_message && type !== 'menu_summary'
              ? true
              : false;
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
            steps={stepsByType[type]}
            t={t}
            isCollapsed={collapsedSteps[type]}
            onToggleCollapse={() => toggleStepCollapse(type)}
          />
        ))}
      </div>
    </div>
  );
}
