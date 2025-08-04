-- Create trigger to automatically create payment when payment_confirmation is inserted
CREATE TRIGGER trigger_create_payment_from_confirmation
AFTER INSERT ON public.payment_confirmations
FOR EACH ROW
EXECUTE FUNCTION public.create_payment_from_confirmation();