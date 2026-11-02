-- Link maintenance expenses to a cycle so its card can show the full history.
-- Run once in the Supabase SQL Editor.

DO $$
DECLARE
    cycle_id_type text;
BEGIN
    SELECT format_type(attribute.atttypid, attribute.atttypmod)
      INTO cycle_id_type
      FROM pg_attribute AS attribute
     WHERE attribute.attrelid = 'public.cycles'::regclass
       AND attribute.attname = 'id'
       AND NOT attribute.attisdropped;

    IF cycle_id_type IS NULL THEN
        RAISE EXCEPTION 'Could not find public.cycles.id';
    END IF;

    IF NOT EXISTS (
        SELECT 1
          FROM pg_attribute AS attribute
         WHERE attribute.attrelid = 'public.expenses'::regclass
           AND attribute.attname = 'cycle_id'
           AND NOT attribute.attisdropped
    ) THEN
        EXECUTE format('ALTER TABLE public.expenses ADD COLUMN cycle_id %s', cycle_id_type);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
          FROM pg_constraint
         WHERE conname = 'expenses_cycle_id_fkey'
           AND conrelid = 'public.expenses'::regclass
    ) THEN
        ALTER TABLE public.expenses
            ADD CONSTRAINT expenses_cycle_id_fkey
            FOREIGN KEY (cycle_id) REFERENCES public.cycles(id) ON DELETE SET NULL;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS expenses_cycle_id_expense_date_idx
    ON public.expenses (cycle_id, expense_date DESC);

NOTIFY pgrst, 'reload schema';
