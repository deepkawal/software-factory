# Payment Integrity Review

## Money Movement Impact

- Operation:
- Systems:
- Customer-visible effect:

## Controls

- [ ] Idempotency key strategy documented
- [ ] Retry behavior bounded and safe
- [ ] Timeout behavior documented
- [ ] Replay protection implemented
- [ ] Processor/bank response reconciliation documented
- [ ] Ledger consistency reviewed
- [ ] Rollback path accounts for external side effects
- [ ] Monitoring and alerting reviewed

## Failure Modes

| Failure | Expected behavior | Test evidence |
|---------|-------------------|---------------|
| Timeout | | |
| Duplicate request | | |
| Partial failure | | |

