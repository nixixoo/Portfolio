import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'project/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Define the project IDs to prerender
      return [
        { id: 'portfolio' },
        { id: 'mynotex' },
        { id: 'abysstr' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
