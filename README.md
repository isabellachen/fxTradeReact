Updates
- Refactored to seperate form state from the prices got from the API (decoupling)
- Do not direct dispatch from layout components, instead pass handler functions from parent component, so it's only the parent that has knowledge of actions.
- Renamed and reorganised files so its clear what the application is about on open, e.g. instead of Components folder have the folders sorted by feature.
- Removed obscure interfaces file and colocate the relevant types and interfaces to where they are used. 