angular.module('app')
  .controller('interviewCtrl', function (interviewService, $location, $scope) {
    this.interviewService = interviewService;

    // broadcast event
    $scope.$on('update', (event, args) => {
      const currentPromptIndex = args;
      this.currentPrompt = this.prompts[currentPromptIndex].question;
    });

    this.prompts = [];
    this.currentPromptIndex = -1;
    this.currentPrompt = '';
    this.interviewStarted = true;

    this.selectedPracticePrompt = this.interviewService.selectedPrompt;
    this.options = {
      type: [
        { id: 0, name: '', value: '' },
        { id: 1, name: 'all', value: 'All' },
        { id: 2, name: 'non-technical', value: 'Non-Technical' },
        { id: 3, name: 'technical', value: 'Technical' }
      ],
      selectedType: { id: 1, name: 'all', value: 'All' }
    };

    this.init = () => {
      if ($location.path() === '/interview/practice') {
        this.setPrompts();
      }
      if ($location.path() === '/interview/mock') {
        this.interviewService.queryPrompts('all', (err, data) => {
          this.prompts = this.interviewService.selectNumPrompts(10, data);
          console.log(this.prompts);
        });
      }
    };

    this.setPrompts = () => {
      const tag = this.options.selectedType.name;
      this.interviewService.queryPrompts(tag, (err, data) => {
        this.prompts = this.interviewService.selectNumPrompts(null, data);
      });
    };

    this.selectPrompt = () => {
      this.selectedPrompt = this.interviewService.selectPrompt(this.selectedPrompt);
    };

    this.init();
  })
  .component('interview', {
    controller: 'interviewCtrl',
    templateUrl: 'templates/interview.html'
  });
