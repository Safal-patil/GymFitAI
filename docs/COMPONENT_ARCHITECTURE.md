# Component Architecture Documentation

## Service Layer Architecture

```
src/services/
├── api.ts              # Base API client with interceptors
├── authService.ts      # Authentication operations
├── exerciseService.ts  # Exercise and workout operations
├── plannerService.ts   # Workout planning operations
├── recommendationService.ts # AI recommendations
├── transactionService.ts    # Payment operations
└── notificationService.ts   # Notification management
```

## Context Providers

### AuthContext
- User authentication state
- Login/logout operations
- Token management
- User profile updates

### UserContext
- Workout data management
- Exercise tracking
- Progress monitoring
- Server synchronization

### NotificationContext
- Toast notifications
- Error messaging
- Success feedback
- System alerts

## Custom Hooks

### useApi
```typescript
const { data, loading, error, execute } = useApi(
  () => exerciseService.getExercises(),
  { immediate: true }
);
```

### useMutation
```typescript
const { mutate, loading } = useMutation(
  (data) => exerciseService.updateStatus(data),
  { onSuccess: () => showSuccess() }
);
```

### useWorkouts
```typescript
const { 
  exercises, 
  updateExerciseStatus, 
  refreshExercises 
} = useWorkouts();
```

## Component Hierarchy

```
App
├── ErrorBoundary
├── NotificationProvider
├── AuthProvider
├── UserProvider
└── AutoFillProvider
    ├── LandingPage
    ├── AuthPage
    └── Layout
        ├── Dashboard
        │   ├── WorkoutPlanCreator
        │   ├── WorkoutTracker
        │   ├── ProgressCalendar
        │   └── StatsCard
        ├── Recommendations
        ├── PreviousWorkouts
        ├── Pricing
        └── Account
```

## Data Flow

### Authentication Flow
1. User submits credentials
2. AuthService validates with API
3. Tokens stored in localStorage
4. AuthContext updates user state
5. UserContext syncs user data
6. Components re-render with auth state

### Workout Creation Flow
1. User fills WorkoutPlanCreator form
2. RecommendationService calls AI API
3. Server creates exercises and planner
4. UserContext syncs new data
5. Dashboard updates with new workouts
6. Local storage backup created

### Exercise Tracking Flow
1. User completes exercise in WorkoutTracker
2. Local state updates immediately
3. ExerciseService syncs with server
4. UserContext updates exercise status
5. Progress components re-render
6. Success notification shown

## Error Handling Strategy

### Component Level
- ErrorBoundary catches React errors
- Graceful fallback UI
- Error reporting to console
- Recovery mechanisms

### Service Level
- Automatic retry with backoff
- Network error detection
- Token refresh handling
- User-friendly error messages

### Context Level
- Error state management
- Loading state coordination
- Data consistency checks
- Rollback mechanisms

## Performance Considerations

### Code Splitting
```typescript
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
```

### Memoization
```typescript
const MemoizedWorkoutCard = memo(WorkoutCard);
const memoizedExercises = useMemo(() => 
  exercises.filter(e => e.completed), [exercises]
);
```

### Virtual Scrolling
- Large exercise lists
- Workout history pagination
- Infinite scroll implementation

## Testing Strategy

### Unit Tests
- Service layer functions
- Custom hooks
- Utility functions
- Component logic

### Integration Tests
- API service integration
- Context provider behavior
- Component interactions
- Error scenarios

### E2E Tests
- Complete user workflows
- Authentication flows
- Workout creation and tracking
- Error recovery